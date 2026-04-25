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
 * フッターは jsPDF レイヤーで各ページに描画するため、ページ跨ぎでの
 * カバレッジ抜け（#22 バグ）が起きない。
 */

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const CAPTURE_SCALE = 2;
const JPEG_QUALITY = 0.92;

export interface PdfGenOptions {
  /** 見積番号。各ページのフッターに印字する（ASCII想定）。 */
  quoteNumber?: string;
  /** Solo 課金者向けに「改正建設業法 2025 対応版」フッター文言を追加するか */
  lawCompliantBadge?: boolean;
}

export async function generatePdfBlobFromElement(
  element: HTMLElement,
  options: PdfGenOptions = {},
): Promise<Blob> {
  const { quoteNumber = "", lawCompliantBadge = false } = options;

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  // no-break ブロックの矩形をキャプチャ前（DOM 計測可能なタイミング）に取得する。
  // CAPTURE_SCALE 倍した canvas 座標系に換算しておく（#21）。
  const elementRect = element.getBoundingClientRect();
  const noBreakBlocks = Array.from(
    element.querySelectorAll<HTMLElement>("[data-pdf-no-break]"),
  ).map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      topPx: (rect.top - elementRect.top) * CAPTURE_SCALE,
      bottomPx: (rect.bottom - elementRect.top) * CAPTURE_SCALE,
    };
  });

  const canvas = await html2canvas(element, {
    scale: CAPTURE_SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    allowTaint: false,
    imageTimeout: 15000,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgWidthMm = A4_WIDTH_MM;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;
  const imgData = canvas.toDataURL("image/jpeg", JPEG_QUALITY);

  // canvas px ↔ PDF mm の変換係数
  const pxToMm = imgWidthMm / canvas.width;
  const canvasPxPerPage = A4_HEIGHT_MM / pxToMm;

  // no-break を考慮した各ページの開始 Y (canvas px)
  const pageStartsPx = computePageStarts(
    canvas.height,
    canvasPxPerPage,
    noBreakBlocks,
  );
  const totalPages = pageStartsPx.length;

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) pdf.addPage();
    const offsetMm = -pageStartsPx[i] * pxToMm;
    pdf.addImage(imgData, "JPEG", 0, offsetMm, imgWidthMm, imgHeightMm);

    drawPageFooter(pdf, quoteNumber, i + 1, totalPages, lawCompliantBadge);
  }

  return pdf.output("blob");
}

/**
 * no-break ブロック（見出し+本文を分離したくない領域）を避けるように
 * 各ページの開始 Y 座標（canvas px）を決定する。
 *
 * 自然な改ページ位置 (currentStart + canvasPxPerPage) が no-break ブロック内
 * に落ちる場合、そのブロックの先頭まで改ページを前倒す。ブロック自体が
 * 1ページより大きい場合はフォールバックで通常カット（救済不能）。
 */
function computePageStarts(
  canvasHeight: number,
  canvasPxPerPage: number,
  noBreakBlocks: { topPx: number; bottomPx: number }[],
): number[] {
  const starts: number[] = [0];
  // 無限ループ防止上限（1000ページは明らかに非現実的）
  for (let guard = 0; guard < 1000; guard++) {
    const currentStart = starts[starts.length - 1];
    const naturalEnd = currentStart + canvasPxPerPage;
    if (naturalEnd >= canvasHeight) break;

    let breakAt = naturalEnd;
    for (const block of noBreakBlocks) {
      const blockHeight = block.bottomPx - block.topPx;
      const crossesBoundary =
        block.topPx < breakAt && block.bottomPx > breakAt;
      const startsAfterCurrentPage = block.topPx > currentStart;
      const fitsInOnePage = blockHeight <= canvasPxPerPage;
      if (crossesBoundary && startsAfterCurrentPage && fitsInOnePage) {
        if (block.topPx < breakAt) breakAt = block.topPx;
      }
    }
    // 進まなくなったら自然カットに退避（保険）
    if (breakAt <= currentStart) breakAt = naturalEnd;
    starts.push(breakAt);
  }
  return starts;
}

/**
 * 各ページ右下にページ番号を印字（印刷時にページがバラけた際の担保 #23）。
 * Solo 課金者には「改正建設業法 2025 対応版」フッター文言も中央左に追加。
 * jsPDF の既定フォント（Helvetica）で描画するため英数字・記号に限定。
 */
function drawPageFooter(
  pdf: jsPDF,
  quoteNumber: string,
  page: number,
  total: number,
  lawCompliantBadge: boolean,
) {
  pdf.saveGraphicsState();
  try {
    pdf.setGState(pdf.GState({ opacity: 1 }));
  } catch {
    // ignore
  }
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(110, 110, 110);
  pdf.setFontSize(8);

  const label = quoteNumber
    ? `No. ${quoteNumber}   ${page} / ${total}`
    : `${page} / ${total}`;

  pdf.text(label, A4_WIDTH_MM - 12, A4_HEIGHT_MM - 8, { align: "right" });

  if (lawCompliantBadge) {
    pdf.setTextColor(30, 64, 175); // kenmitsu-navy
    pdf.setFontSize(7);
    pdf.text(
      "Compliant with Construction Industry Act 2025 (revised)",
      12,
      A4_HEIGHT_MM - 8,
      { align: "left" },
    );
  }

  pdf.restoreGraphicsState();
}
