"use client";

import { useEffect, useCallback } from "react";
import { ConstructionQuoteData } from "@/types/construction";

const STORAGE_KEY = "mitsumori-maker-construction-company-info-v1";

export interface ConstructionCompanyInfo {
  companyName: string;
  companyContact: string;
  companyZip: string;
  companyAddress: string;
  companyTel: string;
  companyEmail: string;
  companyRegistrationNumber: string;
  constructionLicenseNumber: string;
}

const storedFields: (keyof ConstructionCompanyInfo)[] = [
  "companyName",
  "companyContact",
  "companyZip",
  "companyAddress",
  "companyTel",
  "companyEmail",
  "companyRegistrationNumber",
  "constructionLicenseNumber",
];

export function getSavedConstructionCompanyInfo():
  | ConstructionCompanyInfo
  | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as ConstructionCompanyInfo;
  } catch {
    return null;
  }
}

export function saveConstructionCompanyInfo(
  info: ConstructionCompanyInfo
): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    window.dispatchEvent(new Event("mitsumori-master-change"));
  } catch {
    // storage full / unavailable
  }
}

export function clearConstructionCompanyInfo(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function hasSavedConstructionCompanyInfo(): boolean {
  return getSavedConstructionCompanyInfo() !== null;
}

/**
 * Hook that loads saved company info into the form data on mount (if fields empty),
 * and provides save function.
 */
export function useConstructionCompanyInfo(
  data: ConstructionQuoteData,
  onChange: (data: ConstructionQuoteData) => void
) {
  useEffect(() => {
    const saved = getSavedConstructionCompanyInfo();
    if (!saved) return;

    // 既に何か入力されている場合は自動読込しない
    const hasAnyFilled =
      data.companyName || data.companyAddress || data.companyTel;
    if (hasAnyFilled) return;

    const updated = { ...data };
    let changed = false;
    for (const key of storedFields) {
      const savedValue = saved[key];
      const currentValue = (updated as unknown as Record<string, string>)[key];
      if (savedValue && !currentValue) {
        (updated as unknown as Record<string, string>)[key] = savedValue;
        changed = true;
      }
    }
    if (changed) onChange(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(() => {
    const info: ConstructionCompanyInfo = {
      companyName: data.companyName,
      companyContact: data.companyContact,
      companyZip: data.companyZip,
      companyAddress: data.companyAddress,
      companyTel: data.companyTel,
      companyEmail: data.companyEmail,
      companyRegistrationNumber: data.companyRegistrationNumber,
      constructionLicenseNumber: data.constructionLicenseNumber,
    };
    saveConstructionCompanyInfo(info);
  }, [data]);

  const isSaved = useCallback(() => {
    const saved = getSavedConstructionCompanyInfo();
    if (!saved) return false;
    return storedFields.every((k) => {
      const savedValue = saved[k];
      const currentValue = (data as unknown as Record<string, string>)[k];
      return savedValue === currentValue;
    });
  }, [data]);

  return { save, isSaved };
}
