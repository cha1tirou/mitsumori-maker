"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * モーダル等を document.body 直下にレンダリングするための Portal。
 *
 * 背景: ConstructionEditor の左カラムが `lg:sticky lg:overflow-y-auto` で
 * 独自のスタッキングコンテキストを形成しており、その子孫に `position: fixed` の
 * モーダルを置いても、右カラムの sticky プレビューより上に描画されない。
 * （fixed は親のスタッキングコンテキスト内でしか持ち上がらない）
 *
 * Portal で body 直下に逃がすことでルートのスタッキングコンテキストに入り、
 * z-index だけで重なり順を制御できる状態になる。
 */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
