/**
 * 人名・地名で混用されやすい異体字と標準字体の対応表。
 *
 * NFKC 正規化では統合されないため明示的マッピングが必要。
 * 発注者名で異体字（例: 髙・﨑）を使っているのに、工事場所や工事名では
 * 標準字体（高・崎）になっている、という typo/不整合を検出する用途（#24）。
 *
 * このリストは「人名で混用されやすい」ものに限定しており、厳密な Unicode
 * 異体字全集ではない。追加したい字は PR ベースで随時拡張する。
 */
export const ITUJI_MAP: Record<string, string[]> = {
  "髙": ["高"],
  "﨑": ["崎"],
  "邊": ["辺", "邉"],
  "邉": ["辺", "邊"],
  "德": ["徳"],
  "澤": ["沢"],
  "齋": ["斎", "斉"],
  "齊": ["斎", "斉"],
  "濵": ["浜", "濱"],
  "濱": ["浜", "濵"],
  "廣": ["広"],
  "寬": ["寛"],
  "惠": ["恵"],
  "眞": ["真"],
  "槇": ["槙"],
  "祐": ["佑"], // 厳密には異体字ではないが人名で混用されやすい
};

export type ItujiTargetField = "clientName" | "siteAddress" | "subject";

export interface ItujiWarning {
  /** 警告を表示する対象フィールド */
  field: ItujiTargetField;
  /** 発注者名で使っている異体字 */
  variantChar: string;
  /** 対象フィールドで使われている標準字体 */
  standardChar: string;
  /** UI に表示するメッセージ */
  message: string;
}

const FIELD_LABELS: Record<ItujiTargetField, string> = {
  clientName: "発注者名",
  siteAddress: "工事場所",
  subject: "工事名",
};

/**
 * 発注者名を「正」として、工事場所・工事名に標準字体の食い違いがないか検査する。
 *
 * 発注者が意図して「高」と「髙」を使い分けていた場合に備え、警告は blocking 非対応。
 * UI 側でグレー or 注意色の注釈として表示し、dismissible にすること。
 */
export function detectItujiInconsistencies(data: {
  clientName?: string;
  siteAddress?: string;
  subject?: string;
}): ItujiWarning[] {
  const clientName = data.clientName ?? "";
  if (!clientName) return [];

  const variantCharsInName: string[] = [];
  const seen = new Set<string>();
  for (const ch of clientName) {
    if (ITUJI_MAP[ch] && !seen.has(ch)) {
      variantCharsInName.push(ch);
      seen.add(ch);
    }
  }
  if (variantCharsInName.length === 0) return [];

  const warnings: ItujiWarning[] = [];
  const otherFields: [ItujiTargetField, string][] = [
    ["siteAddress", data.siteAddress ?? ""],
    ["subject", data.subject ?? ""],
  ];

  for (const variantChar of variantCharsInName) {
    const standards = ITUJI_MAP[variantChar] ?? [];
    for (const [field, value] of otherFields) {
      if (!value) continue;
      // 既に同じ異体字を使っていれば一致＝問題なし
      if (value.includes(variantChar)) continue;
      for (const std of standards) {
        if (value.includes(std)) {
          warnings.push({
            field,
            variantChar,
            standardChar: std,
            message: `発注者名では「${variantChar}」を使用していますが、${FIELD_LABELS[field]}は「${std}」(標準字体) になっています。意図通りですか？`,
          });
          break; // 同じフィールドで複数マッチ出しても冗長なので最初の一致のみ
        }
      }
    }
  }
  return warnings;
}
