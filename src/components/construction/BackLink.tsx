"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
  /** 履歴がない時のフォールバック先。デフォルトは /construction（LP）。 */
  fallbackHref?: string;
  className?: string;
  children: ReactNode;
}

/**
 * ヘッダーの「戻る」リンク。基本的に browser history を1つ戻る。
 * Direct アクセス（外部からの流入で history が無い）等のフォールバックでは
 * fallbackHref に遷移する。
 *
 * 課金 LP（/construction）に直接飛ばすと購入意図のないユーザーをマーケ画面に
 * 押し戻してしまうため、フッター/ヘッダーの「戻る」は常にこのコンポーネントを使う。
 */
export default function BackLink({
  fallbackHref = "/construction",
  className = "",
  children,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window === "undefined") {
      router.push(fallbackHref);
      return;
    }
    // history.length は同一タブ内で開いた SPA / hard nav の合計なので、
    // 同一ドメインの referrer がある場合のみ back() に頼り、それ以外は fallback。
    const sameOriginReferrer =
      typeof document !== "undefined" &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin);
    if (sameOriginReferrer && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
