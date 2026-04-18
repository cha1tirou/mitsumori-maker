"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────── */

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  removing: boolean;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

/* ─── Context ────────────────────────────────────────── */

const ToastContext = createContext<ToastApi | null>(null);

const MAX_VISIBLE = 3;

const DURATION: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  info: 3000,
};

const ICON: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-kenmitsu-ok shrink-0" />,
  error: <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />,
  info: <Info className="w-5 h-5 text-gray-600 shrink-0" />,
};

const BORDER_COLOR: Record<ToastType, string> = {
  success: "border-l-kenmitsu-ok",
  error: "border-l-red-600",
  info: "border-l-gray-600",
};

/* ─── Provider ───────────────────────────────────────── */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    // Start exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, removing: true } : t))
    );
    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 200);
  }, []);

  const add = useCallback(
    (type: ToastType, message: string) => {
      const id = nextId.current++;
      setToasts((prev) => {
        const next = [...prev, { id, type, message, removing: false }];
        // If over max, mark oldest for removal
        if (next.length > MAX_VISIBLE) {
          const oldest = next.find((t) => !t.removing);
          if (oldest) {
            dismiss(oldest.id);
          }
        }
        return next;
      });

      // Auto-dismiss
      setTimeout(() => dismiss(id), DURATION[type]);
    },
    [dismiss]
  );

  const api: ToastApi = {
    success: useCallback((msg: string) => add("success", msg), [add]),
    error: useCallback((msg: string) => add("error", msg), [add]),
    info: useCallback((msg: string) => add("info", msg), [add]),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Toast card ─────────────────────────────────────── */

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(false);

  // Trigger enter animation on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const isOut = toast.removing || !visible;

  return (
    <div
      role="alert"
      onClick={onDismiss}
      className={`
        pointer-events-auto cursor-pointer
        flex items-start gap-3 w-80 px-4 py-3
        bg-white border-l-4 ${BORDER_COLOR[toast.type]}
        rounded-lg shadow-lg
        transition-all duration-200 ease-out
        ${isOut ? "translate-x-[120%] opacity-0" : "translate-x-0 opacity-100"}
      `}
    >
      {ICON[toast.type]}
      <span className="text-sm text-gray-800 leading-snug flex-1 break-words">
        {toast.message}
      </span>
      <X className="w-4 h-4 text-gray-400 hover:text-gray-600 shrink-0 mt-0.5" />
    </div>
  );
}

/* ─── Hook ───────────────────────────────────────────── */

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}
