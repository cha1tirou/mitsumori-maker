import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { QuoteData, TemplateName } from "@/types/quote";
import { QuoteItem } from "@/types/quote";

// Noto Sans JPフォント登録
Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.1/files/noto-sans-jp-japanese-400-normal.woff",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.1/files/noto-sans-jp-japanese-700-normal.woff",
      fontWeight: 700,
    },
  ],
});

function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function calcSubtotal(items: QuoteItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// テンプレートごとのカラーパレット
const palettes: Record<TemplateName, { primary: string; primaryLight: string; accent: string; title: string }> = {
  standard:     { primary: "#1a1a2e", primaryLight: "#2d2d4a", accent: "#e94560", title: "見 積 書" },
  minimal:      { primary: "#374151", primaryLight: "#4b5563", accent: "#9ca3af", title: "見積書" },
  premium:      { primary: "#1a1a2e", primaryLight: "#2d2d4a", accent: "#e94560", title: "見 積 書" },
  blue:         { primary: "#2563eb", primaryLight: "#3b82f6", accent: "#2563eb", title: "見 積 書" },
  mono:         { primary: "#000000", primaryLight: "#1f2937", accent: "#000000", title: "見 積 書" },
  colorful:     { primary: "#ea580c", primaryLight: "#f97316", accent: "#ec4899", title: "見積書" },
  construction: { primary: "#166534", primaryLight: "#15803d", accent: "#166534", title: "工事見積書" },
  lined:        { primary: "#374151", primaryLight: "#4b5563", accent: "#374151", title: "御 見 積 書" },
};

const colors = {
  primary: "#1a1a2e",
  primaryLight: "#2d2d4a",
  accent: "#e94560",
  gray50: "#f9fafb",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray800: "#1f2937",
  white: "#ffffff",
};

const baseStyles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9,
    color: colors.gray800,
    padding: "15mm",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.primary,
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 6,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: colors.accent,
    marginBottom: 24,
    alignSelf: "center" as const,
  },
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 24,
  },
  label: {
    fontSize: 8,
    color: colors.gray400,
    marginBottom: 2,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 4,
    marginBottom: 8,
  },
  companyInfo: {
    fontSize: 8,
    color: colors.gray500,
    textAlign: "right" as const,
    lineHeight: 1.6,
  },
  companyName: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 4,
    textAlign: "right" as const,
  },
  totalBox: {
    backgroundColor: "#f0f0f5",
    borderWidth: 1,
    borderColor: "#d0d0e0",
    borderRadius: 6,
    padding: "8 12",
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 8,
    color: colors.gray500,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.primary,
  },
  tableHeader: {
    flexDirection: "row" as const,
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: "row" as const,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray200,
  },
  tableRowAlt: {
    backgroundColor: colors.gray50,
  },
  summaryContainer: {
    alignItems: "flex-end" as const,
    marginTop: 12,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    width: 200,
    paddingVertical: 3,
  },
  summaryTotal: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    width: 200,
    paddingVertical: 6,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginTop: 4,
  },
  notesSection: {
    borderTopWidth: 0.5,
    borderTopColor: colors.gray200,
    paddingTop: 12,
  },
  notesLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.gray500,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 8,
    color: colors.gray600,
    lineHeight: 1.6,
  },
});

function TemplatePdf({ data, template }: { data: QuoteData; template: TemplateName }) {
  const palette = palettes[template];
  const subtotal = calcSubtotal(data.items);
  const tax = Math.floor(subtotal * (data.taxRate / 100));
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <Text style={[baseStyles.title, { color: palette.primary }]}>{palette.title}</Text>
        <View style={[baseStyles.divider, { backgroundColor: palette.accent }]} />

        <View style={baseStyles.row}>
          <View style={{ width: "48%" }}>
            <Text style={[baseStyles.clientName, { color: palette.primary, borderBottomColor: palette.primary }]}>
              {data.clientName || "（宛先）"} {data.clientTitle}
            </Text>
            {data.subject ? (
              <Text style={{ fontSize: 8, color: colors.gray500 }}>
                件名：{data.subject}
              </Text>
            ) : null}
            <Text style={{ fontSize: 9, marginTop: 12 }}>
              下記の通りお見積り申し上げます。
            </Text>
            <View style={baseStyles.totalBox}>
              <Text style={baseStyles.totalLabel}>お見積り金額（税込）</Text>
              <Text style={baseStyles.totalAmount}>{formatCurrency(total)}</Text>
            </View>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={[baseStyles.companyName, { color: palette.primary }]}>
              {data.companyName || "（自社名）"}
            </Text>
            {data.companyZip ? (
              <Text style={baseStyles.companyInfo}>〒{data.companyZip}</Text>
            ) : null}
            {data.companyAddress ? (
              <Text style={baseStyles.companyInfo}>{data.companyAddress}</Text>
            ) : null}
            {data.companyTel ? (
              <Text style={baseStyles.companyInfo}>TEL: {data.companyTel}</Text>
            ) : null}
            {data.companyEmail ? (
              <Text style={baseStyles.companyInfo}>{data.companyEmail}</Text>
            ) : null}
            {data.companyRegistrationNumber ? (
              <Text style={baseStyles.companyInfo}>
                登録番号: {data.companyRegistrationNumber}
              </Text>
            ) : null}
            <View style={{ marginTop: 8 }}>
              {data.quoteNumber ? (
                <Text style={baseStyles.companyInfo}>
                  見積番号: {data.quoteNumber}
                </Text>
              ) : null}
              <Text style={baseStyles.companyInfo}>
                見積日: {formatDate(data.quoteDate)}
              </Text>
              {data.expiryDate ? (
                <Text style={baseStyles.companyInfo}>
                  有効期限: {formatDate(data.expiryDate)}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* テーブル */}
        <View style={[baseStyles.tableHeader, { backgroundColor: palette.primary }]}>
          <Text style={[baseStyles.tableHeaderText, { width: 24 }]}>#</Text>
          <Text style={[baseStyles.tableHeaderText, { flex: 1 }]}>品目</Text>
          <Text
            style={[baseStyles.tableHeaderText, { width: 50, textAlign: "right" }]}
          >
            数量
          </Text>
          <Text
            style={[baseStyles.tableHeaderText, { width: 40, textAlign: "center" }]}
          >
            単位
          </Text>
          <Text
            style={[baseStyles.tableHeaderText, { width: 70, textAlign: "right" }]}
          >
            単価
          </Text>
          <Text
            style={[baseStyles.tableHeaderText, { width: 70, textAlign: "right" }]}
          >
            金額
          </Text>
        </View>
        {data.items.map((item, i) => (
          <View
            key={item.id}
            style={[baseStyles.tableRow, ...(i % 2 === 1 ? [baseStyles.tableRowAlt] : [])]}
          >
            <Text style={{ width: 24, fontSize: 8, color: colors.gray400 }}>
              {i + 1}
            </Text>
            <Text style={{ flex: 1, fontSize: 9 }}>{item.name || "—"}</Text>
            <Text style={{ width: 50, textAlign: "right", fontSize: 9 }}>
              {item.quantity}
            </Text>
            <Text
              style={{ width: 40, textAlign: "center", fontSize: 9 }}
            >
              {item.unit}
            </Text>
            <Text style={{ width: 70, textAlign: "right", fontSize: 9 }}>
              {formatCurrency(item.unitPrice)}
            </Text>
            <Text
              style={{ width: 70, textAlign: "right", fontSize: 9, fontWeight: 700 }}
            >
              {formatCurrency(item.quantity * item.unitPrice)}
            </Text>
          </View>
        ))}

        {/* 小計 */}
        <View style={baseStyles.summaryContainer}>
          <View style={baseStyles.summaryRow}>
            <Text style={{ fontSize: 8, color: colors.gray500 }}>小計</Text>
            <Text style={{ fontSize: 9 }}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={baseStyles.summaryRow}>
            <Text style={{ fontSize: 8, color: colors.gray500 }}>
              消費税（{data.taxRate}%）
            </Text>
            <Text style={{ fontSize: 9 }}>{formatCurrency(tax)}</Text>
          </View>
          <View style={[baseStyles.summaryTotal, { borderTopColor: palette.primary }]}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: palette.primary }}>
              合計（税込）
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: palette.primary }}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>

        {data.notes ? (
          <View style={baseStyles.notesSection}>
            <Text style={baseStyles.notesLabel}>備考</Text>
            <Text style={baseStyles.notesText}>{data.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function generatePdf(
  data: QuoteData,
  template: TemplateName
): Promise<Blob> {
  const blob = await pdf(<TemplatePdf data={data} template={template} />).toBlob();
  return blob;
}
