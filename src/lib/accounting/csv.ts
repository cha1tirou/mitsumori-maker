import {
  ConstructionQuoteData,
} from "@/types/construction";
import { calcConstructionTotals, itemAmount } from "@/lib/constructionCalc";

export type AccountingFormat = "generic" | "freee" | "mf" | "yayoi";

export const accountingFormatLabels: Record<AccountingFormat, string> = {
  generic: "汎用CSV（日本語ヘッダー）",
  freee: "freee（取引インポート）",
  mf: "マネーフォワード クラウド（仕訳帳）",
  yayoi: "弥生会計（仕訳データ）",
};

/**
 * CSV を生成する汎用関数。UTF-8 BOM付きで返す（Excel 日本語対応）。
 */
function toCsv(headers: string[], rows: (string | number)[][]): string {
  const escape = (v: string | number) => {
    const s = String(v ?? "");
    if (/[",\n\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const lines = [headers.map(escape).join(",")];
  rows.forEach((row) => {
    lines.push(row.map(escape).join(","));
  });
  // BOM for Excel compatibility
  return "\ufeff" + lines.join("\r\n");
}

function formatJstDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

/**
 * 汎用CSV（見積書明細のダンプ）
 * 単純に明細を1行ずつCSVで吐く。ユーザーが好きに加工できる。
 */
export function generateGenericCsv(data: ConstructionQuoteData): string {
  const totals = calcConstructionTotals(data);
  const headers = [
    "セクション",
    "中項目",
    "費目",
    "品目",
    "数量",
    "単位",
    "単価",
    "金額",
  ];
  const rows: (string | number)[][] = [];

  const catLabel: Record<string, string> = {
    labor: "労務費",
    material: "材料費",
    outsourcing: "外注費",
    other: "その他経費",
  };

  data.sections.forEach((section) => {
    section.items.forEach((item) => {
      rows.push([
        section.name,
        "",
        catLabel[item.category] ?? item.category,
        item.name,
        item.quantity,
        item.unit,
        item.unitPrice,
        itemAmount(item),
      ]);
    });
    (section.subsections ?? []).forEach((sub) => {
      sub.items.forEach((item) => {
        rows.push([
          section.name,
          sub.name,
          catLabel[item.category] ?? item.category,
          item.name,
          item.quantity,
          item.unit,
          item.unitPrice,
          itemAmount(item),
        ]);
      });
    });
  });

  // 諸経費・法定福利費・税金を追加
  if (totals.legalWelfare > 0) {
    rows.push(["", "", "法定福利費", `労務費×${data.legalWelfareRate}%`, 1, "式", totals.legalWelfare, totals.legalWelfare]);
  }
  if (totals.siteManagementFee > 0) {
    rows.push(["", "", "諸経費", `現場管理費(${data.siteManagementFeeRate}%)`, 1, "式", totals.siteManagementFee, totals.siteManagementFee]);
  }
  if (totals.generalManagementFee > 0) {
    rows.push(["", "", "諸経費", `一般管理費(${data.generalManagementFeeRate}%)`, 1, "式", totals.generalManagementFee, totals.generalManagementFee]);
  }
  rows.push(["", "", "消費税", `税率${data.taxRate}%`, 1, "式", totals.tax, totals.tax]);
  rows.push(["", "", "合計", "（税込）", 1, "式", totals.total, totals.total]);

  return toCsv(headers, rows);
}

/**
 * freee 取引インポート形式
 * 参考: https://support.freee.co.jp/hc/ja/articles/900000040863
 * [収支区分][管理番号][発生日][決済期日][取引先][勘定科目][税区分][金額][備考]
 */
export function generateFreeeCsv(data: ConstructionQuoteData): string {
  const totals = calcConstructionTotals(data);
  const headers = [
    "収支区分",
    "管理番号",
    "発生日",
    "決済期日",
    "取引先",
    "勘定科目",
    "税区分",
    "金額",
    "税込/税抜",
    "備考",
  ];
  const payeeName = data.clientName || "";
  const issueDate = formatJstDate(data.quoteDate);
  const dueDays = Number(data.validityDays) || 30;
  const due = new Date(data.quoteDate);
  due.setDate(due.getDate() + dueDays);
  const dueDate = formatJstDate(due.toISOString());
  const refNo = data.quoteNumber || "";
  const subject = data.subject || "工事";

  const taxCategory = data.taxRate === 10 ? "課税売上10%" : data.taxRate === 8 ? "課税売上8%(軽)" : "対象外";

  const rows: (string | number)[][] = [
    [
      "収入",
      refNo,
      issueDate,
      dueDate,
      payeeName,
      "売上高",
      taxCategory,
      totals.subtotal,
      "税抜",
      `${subject} / 見積書 ${refNo}`,
    ],
  ];

  return toCsv(headers, rows);
}

/**
 * マネーフォワードクラウド 仕訳インポート形式
 * 参考: https://biz.moneyforward.com/support/account/faq/import/import01.html
 */
export function generateMfCsv(data: ConstructionQuoteData): string {
  const totals = calcConstructionTotals(data);
  const headers = [
    "取引日",
    "借方勘定科目",
    "借方金額",
    "借方税区分",
    "貸方勘定科目",
    "貸方金額",
    "貸方税区分",
    "摘要",
  ];
  const issueDate = formatJstDate(data.quoteDate);
  const subject = data.subject || "工事";
  const rows: (string | number)[][] = [
    [
      issueDate,
      "売掛金",
      totals.total,
      "対象外",
      "売上高",
      totals.subtotal,
      data.taxRate === 10 ? "課税売上10%" : data.taxRate === 8 ? "課税売上8%(軽)" : "対象外",
      `${subject} / ${data.clientName || ""} / 見積書${data.quoteNumber || ""}`,
    ],
  ];
  if (totals.tax > 0) {
    rows.push([
      issueDate,
      "",
      "",
      "",
      "仮受消費税",
      totals.tax,
      "対象外",
      `${subject} / 消費税 ${data.taxRate}%`,
    ]);
  }
  return toCsv(headers, rows);
}

/**
 * 弥生会計 仕訳データインポート形式
 * 参考: https://support.yayoi-kk.co.jp/subcontents.html?page_id=1032
 * 実際の弥生形式は項目が多いので、主要項目のみに絞る簡易版
 */
export function generateYayoiCsv(data: ConstructionQuoteData): string {
  const totals = calcConstructionTotals(data);
  const headers = [
    "取引日",
    "借方科目",
    "借方金額",
    "貸方科目",
    "貸方金額",
    "摘要",
  ];
  const issueDate = formatJstDate(data.quoteDate);
  const subject = data.subject || "工事";
  const memo = `${subject} / ${data.clientName || ""} / 見積書${data.quoteNumber || ""}`;

  const rows: (string | number)[][] = [
    [issueDate, "売掛金", totals.total, "売上高", totals.subtotal, memo],
  ];
  if (totals.tax > 0) {
    rows.push([issueDate, "", "", "仮受消費税", totals.tax, `${memo} / 消費税`]);
  }
  return toCsv(headers, rows);
}

export function generateAccountingCsv(
  data: ConstructionQuoteData,
  format: AccountingFormat
): { content: string; filename: string } {
  const safeClient = (data.clientName || "見積書").replace(/[/\\?%*:|"<>]/g, "_");
  const date = data.quoteDate || new Date().toISOString().split("T")[0];
  const filenameBase = `${safeClient}_${date}`;

  switch (format) {
    case "freee":
      return {
        content: generateFreeeCsv(data),
        filename: `${filenameBase}_freee.csv`,
      };
    case "mf":
      return {
        content: generateMfCsv(data),
        filename: `${filenameBase}_mf.csv`,
      };
    case "yayoi":
      return {
        content: generateYayoiCsv(data),
        filename: `${filenameBase}_yayoi.csv`,
      };
    default:
      return {
        content: generateGenericCsv(data),
        filename: `${filenameBase}_明細.csv`,
      };
  }
}
