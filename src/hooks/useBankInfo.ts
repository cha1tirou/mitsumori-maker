"use client";

import { useEffect, useCallback } from "react";

const STORAGE_KEY = "mitsumori-maker-bank-info";

export interface BankInfo {
  bankName: string;
  branchName: string;
  accountType: string;
  accountNumber: string;
  accountHolder: string;
}

const bankFields: (keyof BankInfo)[] = [
  "bankName",
  "branchName",
  "accountType",
  "accountNumber",
  "accountHolder",
];

function getSavedBankInfo(): BankInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as BankInfo;
  } catch {
    return null;
  }
}

function saveBankInfo(info: BankInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch {
    // storage full or unavailable
  }
}

export function useBankInfo<T extends BankInfo>(
  data: T,
  onChange: (data: T) => void
) {
  useEffect(() => {
    const saved = getSavedBankInfo();
    if (!saved) return;

    const hasEmptyBankFields = bankFields.every(
      (key) => !data[key] || (key === "accountType" && data[key] === "普通")
    );
    if (!hasEmptyBankFields) return;

    const updated = { ...data };
    let changed = false;
    for (const key of bankFields) {
      if (saved[key] && (!data[key] || (key === "accountType" && data[key] === "普通" && saved[key] !== "普通"))) {
        (updated as unknown as Record<string, string>)[key] = saved[key];
        changed = true;
      }
    }
    if (changed) {
      onChange(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(() => {
    const info: BankInfo = {
      bankName: data.bankName,
      branchName: data.branchName,
      accountType: data.accountType,
      accountNumber: data.accountNumber,
      accountHolder: data.accountHolder,
    };
    saveBankInfo(info);
  }, [data.bankName, data.branchName, data.accountType, data.accountNumber, data.accountHolder]);

  const isSaved = useCallback(() => {
    const saved = getSavedBankInfo();
    if (!saved) return false;
    return bankFields.every((key) => saved[key] === data[key]);
  }, [data]);

  return { save, isSaved };
}
