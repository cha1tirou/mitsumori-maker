"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "mitsumori-construction-customer-master-v1";
export const CUSTOMER_MASTER_LIMIT = 500;

export interface CustomerMasterItem {
  id: string;
  name: string;
  title: string; // 御中 / 様
  contact: string;
  note?: string;
}

function load(): CustomerMasterItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CustomerMasterItem[];
  } catch {
    return [];
  }
}

function persist(items: CustomerMasterItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("mitsumori-master-change"));
  } catch {
    // ignore
  }
}

export function useCustomerMaster() {
  const [items, setItems] = useState<CustomerMasterItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);
  }, []);

  const add = useCallback((item: Omit<CustomerMasterItem, "id">): boolean => {
    let added = false;
    setItems((prev) => {
      if (prev.length >= CUSTOMER_MASTER_LIMIT) return prev;
      added = true;
      const next = [
        ...prev,
        { ...item, id: `cm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
      ];
      persist(next);
      return next;
    });
    return added;
  }, []);

  const update = useCallback((id: string, patch: Partial<CustomerMasterItem>) => {
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

  const addOrUpdateByName = useCallback(
    (item: Omit<CustomerMasterItem, "id">): boolean => {
      let added = false;
      setItems((prev) => {
        const existing = prev.find((c) => c.name === item.name);
        if (existing) {
          added = true;
          const next = prev.map((c) =>
            c.id === existing.id ? { ...c, ...item } : c
          );
          persist(next);
          return next;
        }
        if (prev.length >= CUSTOMER_MASTER_LIMIT) return prev;
        added = true;
        const next = [
          ...prev,
          { ...item, id: `cm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
        ];
        persist(next);
        return next;
      });
      return added;
    },
    []
  );

  return { items, loaded, add, update, remove, addOrUpdateByName };
}
