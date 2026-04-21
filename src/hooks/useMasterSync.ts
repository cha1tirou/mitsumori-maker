"use client";

import { useEffect, useRef } from "react";

type SyncErrorHandler = (message: string) => void;

/**
 * ログインユーザーの自社情報・マスタをサーバーと自動同期する。
 * - mount 時：サーバーから取得して localStorage に反映（サーバーが勝つ）
 * - 定期的：localStorage の内容をサーバーへ PUT（3秒 debounce）
 *
 * onError を渡すと、PUT が 4xx/5xx で失敗した時にメッセージを受け取れる。
 * マイページのマスタ管理画面ではこれをトースト表示に接続する。
 */
export function useMasterSync(
  isAuthenticated: boolean,
  onError?: SyncErrorHandler
) {
  const syncedOnceRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

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
          const res = await fetch("/api/user-data", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyInfo, priceMaster, customerMaster }),
          });
          if (!res.ok) {
            const payload = await res.json().catch(() => ({}));
            onErrorRef.current?.(
              payload?.error ??
                "サーバーに保存できませんでした。時間をおいて再度お試しください。"
            );
          }
        } catch {
          onErrorRef.current?.(
            "通信エラーでサーバーに保存できませんでした。接続状況をご確認ください。"
          );
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
