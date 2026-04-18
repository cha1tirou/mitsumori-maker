/**
 * HTML プレビュー要素を html2canvas でラスタライズし、jsPDF に流し込んで
 * 複数ページ対応の A4 PDF を Blob として返す。
 *
 * @react-pdf/renderer と違い、フォント解析や JS レイアウトが不要なので
 * メインスレッドを 1〜2 秒程度しかブロックしない。
 *
 * トレードオフ: PDF 内のテキストが選択不可（画像として埋め込むため）。
 *              業務提出用には実用上問題なし。
 */

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// A4 寸法（mm）
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// 画像品質とスケール。2x 程度が印刷・ズームに耐える下限
const CAPTURE_SCALE = 2;
const JPEG_QUALITY = 0.92;

export async function generatePdfBlobFromElement(
  element: HTMLElement,
): Promise<Blob> {
  // 埋め込みフォント（Noto Sans JP 等）の描画完了を待つ
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(element, {
    scale: CAPTURE_SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    // iOS Safari での黒背景バグ対策
    allowTaint: false,
    // 高解像度で撮るので imageTimeout は長めに
    imageTimeout: 15000,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // canvas の縦横比から、A4 幅にフィットさせた時の高さを算出
  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  const imgData = canvas.toDataURL("image/jpeg", JPEG_QUALITY);

  // 1ページ目
  pdf.addImage(imgData, "JPEG", 0, 0, imgWidthMm, imgHeightMm);

  // 1ページ分より長い場合は、同じ画像を縦にずらして次ページに追加
  // position は負の値になるほど上にスクロールさせた状態で描画される
  let heightLeft = imgHeightMm - A4_HEIGHT_MM;
  let position = -A4_HEIGHT_MM;
  while (heightLeft > 0) {
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidthMm, imgHeightMm);
    heightLeft -= A4_HEIGHT_MM;
    position -= A4_HEIGHT_MM;
  }

  return pdf.output("blob");
}
