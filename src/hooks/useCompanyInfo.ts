"use client";

import { useEffect, useCallback } from "react";

const STORAGE_KEY = "mitsumori-maker-company-info";

export interface CompanyInfo {
  companyName: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyRegistrationNumber: string;
}

const companyFields: (keyof CompanyInfo)[] = [
  "companyName",
  "companyZip",
  "companyAddress",
  "companyTel",
  "companyEmail",
  "companyRegistrationNumber",
];

export function getSavedCompanyInfo(): CompanyInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as CompanyInfo;
  } catch {
    return null;
  }
}

export function saveCompanyInfo(info: CompanyInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch {
    // storage full or unavailable
  }
}

export function hasSavedCompanyInfo(): boolean {
  return getSavedCompanyInfo() !== null;
}

/**
 * Hook that loads saved company info into the form data on mount,
 * and provides a save function to persist current company info.
 */
export function useCompanyInfo<T extends CompanyInfo>(
  data: T,
  onChange: (data: T) => void
) {
  // Load saved company info on mount (only if fields are empty)
  useEffect(() => {
    const saved = getSavedCompanyInfo();
    if (!saved) return;

    const hasEmptyCompanyFields = companyFields.every(
      (key) => !data[key]
    );
    if (!hasEmptyCompanyFields) return;

    const updated = { ...data };
    let changed = false;
    for (const key of companyFields) {
      if (saved[key] && !data[key]) {
        (updated as unknown as Record<string, string>)[key] = saved[key];
        changed = true;
      }
    }
    if (changed) {
      onChange(updated);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(() => {
    const info: CompanyInfo = {
      companyName: data.companyName,
      companyZip: data.companyZip,
      companyAddress: data.companyAddress,
      companyTel: data.companyTel,
      companyEmail: data.companyEmail,
      companyRegistrationNumber: data.companyRegistrationNumber,
    };
    saveCompanyInfo(info);
  }, [
    data.companyName,
    data.companyZip,
    data.companyAddress,
    data.companyTel,
    data.companyEmail,
    data.companyRegistrationNumber,
  ]);

  const isSaved = useCallback(() => {
    const saved = getSavedCompanyInfo();
    if (!saved) return false;
    return companyFields.every((key) => saved[key] === data[key]);
  }, [data]);

  return { save, isSaved };
}
