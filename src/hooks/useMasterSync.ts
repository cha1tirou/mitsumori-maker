"use client";

import { useEffect, useRef } from "react";

/**
 * ログインユーザーの自社情報・マスタをサーバーと自動同期する。
 * - mount 時：サーバーから取得して localStorage に反映（サーバーが勝つ）
 * - 定期的：localStorage の内容をサーバーへ PUT（1秒 debounce）
 */
export function useMasterSync(isAuthenticated: boolean) {
  const syncedOnceRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // mount 時のダウンロード
  useEffect(() => {
    if (!isAuthenticated || syncedOnceRef.current) return;
    syncedOnceRef.current = true;

    (async () => {
      try {
        const res = await fetch("/api/user-data");
        if (!res.ok) return;
        const data = await res.json();

        if (data.companyInfo && typeof data.companyInfo === "object") {
          try {
            localStorage.setItem(
              "mitsumori-maker-construction-company-info-v1",
              JSON.stringify(data.companyInfo)
            );
          } catch {
            /* ignore */
          }
        }
        if (Array.isArray(data.priceMaster)) {
          try {
            localStorage.setItem(
              "mitsumori-construction-price-master-v1",
              JSON.stringify(data.priceMaster)
            );
          } catch {
            /* ignore */
          }
        }
        if (Array.isArray(data.customerMaster)) {
          try {
            localStorage.setItem(
              "mitsumori-construction-customer-master-v1",
              JSON.stringify(data.customerMaster)
            );
          } catch {
            /* ignore */
          }
        }
        // storage イベントを発火して他コンポーネントに反映を促す
        window.dispatchEvent(new Event("storage"));
      } catch {
        /* ignore */
      }
    })();
  }, [isAuthenticated]);

  // 変更検知してサーバーへアップロード
  useEffect(() => {
    if (!isAuthenticated) return;

    const schedule = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const companyInfo = JSON.parse(
            localStorage.getItem("mitsumori-maker-construction-company-info-v1") ||
              "null"
          );
          const priceMaster = JSON.parse(
            localStorage.getItem("mitsumori-construction-price-master-v1") ||
              "[]"
          );
          const customerMaster = JSON.parse(
            localStorage.getItem(
              "mitsumori-construction-customer-master-v1"
            ) || "[]"
          );
          await fetch("/api/user-data", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyInfo, priceMaster, customerMaster }),
          });
        } catch {
          /* ignore */
        }
      }, 3000);
    };

    const handler = () => schedule();

    window.addEventListener("mitsumori-master-change", handler);
    return () => {
      window.removeEventListener("mitsumori-master-change", handler);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [isAuthenticated]);
}
