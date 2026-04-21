"use client";

import { useEffect, useState, useCallback } from "react";
import { CostCategory } from "@/types/construction";

const STORAGE_KEY = "mitsumori-construction-price-master-v1";
export const PRICE_MASTER_LIMIT = 500;

export interface PriceMasterItem {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  costUnitPrice?: number;
  category: CostCategory;
  workTypeHint?: string; // 工種（電気・水道等）
}

function load(): PriceMasterItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as PriceMasterItem[];
  } catch {
    return [];
  }
}

function persist(items: PriceMasterItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("mitsumori-master-change"));
  } catch {
    // ignore
  }
}

export function usePriceMaster() {
  const [items, setItems] = useState<PriceMasterItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);
  }, []);

  const add = useCallback((item: Omit<PriceMasterItem, "id">): boolean => {
    let added = false;
    setItems((prev) => {
      if (prev.length >= PRICE_MASTER_LIMIT) return prev;
      added = true;
      const next = [
        ...prev,
        { ...item, id: `pm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
      ];
      persist(next);
      return next;
    });
    return added;
  }, []);

  const update = useCallback((id: string, patch: Partial<PriceMasterItem>) => {
    setItems((prev) => {
      const next = prev.map((it) => (it.id === id ? { ...it, ...patch } : it));
      persist(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return { items, loaded, add, update, remove };
}
