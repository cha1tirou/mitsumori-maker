/**
 * HTML プレビュー要素を html2canvas でラスタライズし、jsPDF に流し込んで
 * 複数ページ対応の A4 PDF を Blob として返す。
 *
 * @react-pdf/renderer と違い、フォント解析や JS レイアウトが不要なので
 * メインスレッドを 1〜2 秒程度しかブロックしない。
 *
 * トレードオフ: PDF 内のテキストが選択不可（画像として埋め込むため）。
 *              業務提出用には実用上問題なし。
 *
 * 透かし・フッターは jsPDF レイヤーで各ページに描画するため、ページ跨ぎでの
 * カバレッジ抜け（#22 バグ）が起きない。プレビュー DOM 側の SAMPLE オーバーレイは
 * キャプチャ時に一時的に display:none にして二重描画を避ける。
 */

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const CAPTURE_SCALE = 2;
const JPEG_QUALITY = 0.92;

export interface PdfGenOptions {
  /** 未課金プランの透かしを全ページに入れるか。既定: false */
  watermark?: boolean;
}

export async function generatePdfBlobFromElement(
  element: HTMLElement,
  options: PdfGenOptions = {},
): Promise<Blob> {
  const { watermark = false } = options;

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  // 透かしは jsPDF レイヤーで描画するので、プレビュー DOM の装飾は一時的に隠す。
  // キャプチャ画像に preview 側の SAMPLE が焼き込まれたままだと、jsPDF の
  // 追加透かしと二重になって汚く見える。
  const previewWatermarks = Array.from(
    element.querySelectorAll<HTMLElement>("[data-preview-watermark]"),
  );
  const prevDisplays = previewWatermarks.map((el) => el.style.display);
  previewWatermarks.forEach((el) => {
    el.style.display = "none";
  });

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      scale: CAPTURE_SCALE,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: false,
      imageTimeout: 15000,
    });
  } finally {
    previewWatermarks.forEach((el, i) => {
      el.style.display = prevDisplays[i];
    });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;
  const imgData = canvas.toDataURL("image/jpeg", JPEG_QUALITY);

  const totalPages = Math.max(1, Math.ceil(imgHeightMm / A4_HEIGHT_MM));

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) pdf.addPage();
    const offsetMm = -i * A4_HEIGHT_MM;
    pdf.addImage(imgData, "JPEG", 0, offsetMm, imgWidthMm, imgHeightMm);

    if (watermark) {
      drawSampleWatermark(pdf);
    }
  }

  return pdf.output("blob");
}

/**
 * 1ページ全体に斜めに "SAMPLE" を3段重ねで描画する。ASCII なので
 * 既定の Helvetica で問題なく出る（日本語フォント埋め込み不要）。
 * トリミング攻撃で透かしなし領域を抜き取られないよう、上・中・下3か所に置く。
 */
function drawSampleWatermark(pdf: jsPDF) {
  pdf.saveGraphicsState();

  // 不透明度 0.13 前後で視認性と薄さのバランス。jsPDF の GState ファクトリ経由。
  try {
    pdf.setGState(pdf.GState({ opacity: 0.13 }));
  } catch {
    // 透過未サポート環境では色を淡くしてフォールバック
  }

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(30, 64, 175); // kenmitsu-navy
  pdf.setFontSize(72);

  const centerX = A4_WIDTH_MM / 2;
  const ys = [A4_HEIGHT_MM * 0.22, A4_HEIGHT_MM * 0.52, A4_HEIGHT_MM * 0.82];
  for (const y of ys) {
    pdf.text("SAMPLE", centerX, y, {
      align: "center",
      baseline: "middle",
      angle: 30,
    });
  }

  pdf.restoreGraphicsState();
}
