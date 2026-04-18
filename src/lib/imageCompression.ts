const MAX_INPUT_SIZE = 15 * 1024 * 1024; // 入力ファイル上限（DoS ガード）

type CompressOptions = {
  maxDimension?: number; // 長辺の最大 px
  quality?: number; // JPEG 品質 0〜1
};

// canvas を使って画像を長辺 maxDimension まで縮小し、JPEG dataURL として返す。
// EXIF 回転情報は HTMLImageElement が自動適用する（近年の Chrome/Safari は画像配向を自動処理）。
export async function compressImageToJpegDataUrl(
  file: File,
  { maxDimension = 1600, quality = 0.82 }: CompressOptions = {},
): Promise<string> {
  if (file.size > MAX_INPUT_SIZE) {
    throw new Error(
      `画像が大きすぎます（${Math.round(file.size / 1024 / 1024)}MB）。15MB以下にしてください。`,
    );
  }

  const bitmap = await loadImage(file);
  const { width: srcW, height: srcH } = bitmap;
  const scale = Math.min(1, maxDimension / Math.max(srcW, srcH));
  const dstW = Math.round(srcW * scale);
  const dstH = Math.round(srcH * scale);

  const canvas = document.createElement("canvas");
  canvas.width = dstW;
  canvas.height = dstH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("画像処理に失敗しました（canvas context 取得失敗）。");
  }
  // JPEG は透過をサポートしないため白地で塗る
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, dstW, dstH);
  ctx.drawImage(bitmap, 0, 0, dstW, dstH);

  // ImageBitmap は使い終わったら解放
  if ("close" in bitmap && typeof bitmap.close === "function") {
    bitmap.close();
  }

  return canvas.toDataURL("image/jpeg", quality);
}

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  // createImageBitmap が使えればこちらが速い。EXIF orientation も自動で適用される。
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // 一部ブラウザ / HEIC 系で失敗した場合は <img> にフォールバック
    }
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("画像の読み込みに失敗しました。"));
    };
    img.src = url;
  });
}
