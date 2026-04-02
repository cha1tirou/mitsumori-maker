"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface DraftEnvelope<T> {
  version: number;
  data: T;
  savedAt: number;
}

interface UseDraftSaveOptions<T> {
  key: string;
  version: number;
  defaultData: T;
  debounceMs?: number;
}

interface UseDraftSaveReturn<T> {
  data: T;
  setData: (data: T) => void;
  hasDraft: boolean;
  restoreDraft: () => void;
  discardDraft: () => void;
  clearDraft: () => void;
  isDraftRestored: boolean;
}

function isEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useDraftSave<T>({
  key,
  version,
  defaultData,
  debounceMs = 1000,
}: UseDraftSaveOptions<T>): UseDraftSaveReturn<T> {
  const [data, setData] = useState<T>(defaultData);
  const [hasDraft, setHasDraft] = useState(false);
  const [isDraftRestored, setIsDraftRestored] = useState(false);
  const pendingDraft = useRef<T | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // Check for existing draft on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;

      const envelope: DraftEnvelope<T> = JSON.parse(raw);
      if (envelope.version !== version) {
        // Schema version mismatch — discard silently
        localStorage.removeItem(key);
        return;
      }

      // Only show banner if the saved data differs from default
      if (!isEqual(envelope.data, defaultData)) {
        pendingDraft.current = envelope.data;
        setHasDraft(true);
      }
    } catch {
      // Corrupt data — remove and ignore
      localStorage.removeItem(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced auto-save whenever data changes
  useEffect(() => {
    // Don't save if draft hasn't been acted on yet (restore/discard)
    if (hasDraft && !isDraftRestored) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // Don't save if data is still at defaults
      if (isEqual(data, defaultData)) return;

      try {
        const envelope: DraftEnvelope<T> = {
          version,
          data,
          savedAt: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(envelope));
      } catch {
        // Storage full or unavailable
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasDraft, isDraftRestored]);

  const restoreDraft = useCallback(() => {
    if (pendingDraft.current) {
      setData(pendingDraft.current);
      pendingDraft.current = null;
    }
    setHasDraft(false);
    setIsDraftRestored(true);
  }, []);

  const discardDraft = useCallback(() => {
    pendingDraft.current = null;
    setHasDraft(false);
    setIsDraftRestored(true);
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key]);

  return {
    data,
    setData,
    hasDraft,
    restoreDraft,
    discardDraft,
    clearDraft,
    isDraftRestored,
  };
}
