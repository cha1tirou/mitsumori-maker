import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { PurchaseOrderData, PurchaseOrderItem } from "@/types/purchaseOrder";

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

function calcSubtotal(items: PurchaseOrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

const colors = {
  primary: "#581c87",
  accent: "#a855f7",
  gray50: "#f9fafb",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray800: "#1f2937",
  white: "#ffffff",
  purple700: "#7e22ce",
};

const styles = StyleSheet.create({
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
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    borderRadius: 6,
    padding: "8 12",
    marginTop: 12,
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
});

function PurchaseOrderPdf({ data }: { data: PurchaseOrderData }) {
  const subtotal = calcSubtotal(data.items);
  const tax = Math.floor(subtotal * (data.taxRate / 100));
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>発 注 書</Text>
        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={{ width: "48%" }}>
            <Text style={styles.clientName}>
              {data.clientName || "（発注先）"} {data.clientTitle}
            </Text>
            {data.subject ? (
              <Text style={{ fontSize: 8, color: colors.gray500 }}>
                件名：{data.subject}
              </Text>
            ) : null}
            <Text style={{ fontSize: 9, marginTop: 12 }}>
              下記の通り発注いたします。
            </Text>
            <View style={styles.totalBox}>
              <Text style={{ fontSize: 8, color: colors.gray500, marginBottom: 2 }}>
                発注金額（税込）
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}>
                {formatCurrency(total)}
              </Text>
            </View>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={styles.companyName}>
              {data.companyName || "（自社名）"}
            </Text>
            {data.companyZip ? (
              <Text style={styles.companyInfo}>〒{data.companyZip}</Text>
            ) : null}
            {data.companyAddress ? (
              <Text style={styles.companyInfo}>{data.companyAddress}</Text>
            ) : null}
            {data.companyTel ? (
              <Text style={styles.companyInfo}>TEL: {data.companyTel}</Text>
            ) : null}
            {data.companyEmail ? (
              <Text style={styles.companyInfo}>{data.companyEmail}</Text>
            ) : null}
            {data.companyRegistrationNumber ? (
              <Text style={styles.companyInfo}>
                登録番号: {data.companyRegistrationNumber}
              </Text>
            ) : null}
            <View style={{ marginTop: 8 }}>
              {data.orderNumber ? (
                <Text style={styles.companyInfo}>
                  発注書番号: {data.orderNumber}
                </Text>
              ) : null}
              <Text style={styles.companyInfo}>
                発注日: {formatDate(data.orderDate)}
              </Text>
              {data.deliveryDate ? (
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: colors.purple700,
                    textAlign: "right" as const,
                  }}
                >
                  納期: {formatDate(data.deliveryDate)}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* テーブル */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { width: 24 }]}>#</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>品目</Text>
          <Text style={[styles.tableHeaderText, { width: 50, textAlign: "right" }]}>
            数量
          </Text>
          <Text style={[styles.tableHeaderText, { width: 40, textAlign: "center" }]}>
            単位
          </Text>
          <Text style={[styles.tableHeaderText, { width: 70, textAlign: "right" }]}>
            単価
          </Text>
          <Text style={[styles.tableHeaderText, { width: 70, textAlign: "right" }]}>
            金額
          </Text>
        </View>
        {data.items.map((item, i) => (
          <View
            key={item.id}
            style={[styles.tableRow, ...(i % 2 === 1 ? [styles.tableRowAlt] : [])]}
          >
            <Text style={{ width: 24, fontSize: 8, color: colors.gray400 }}>
              {i + 1}
            </Text>
            <Text style={{ flex: 1, fontSize: 9 }}>{item.name || "—"}</Text>
            <Text style={{ width: 50, textAlign: "right", fontSize: 9 }}>
              {item.quantity}
            </Text>
            <Text style={{ width: 40, textAlign: "center", fontSize: 9 }}>
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
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={{ fontSize: 8, color: colors.gray500 }}>小計</Text>
            <Text style={{ fontSize: 9 }}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ fontSize: 8, color: colors.gray500 }}>
              消費税（{data.taxRate}%）
            </Text>
            <Text style={{ fontSize: 9 }}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.summaryTotal}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: colors.primary }}>
              合計（税込）
            </Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: colors.primary }}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.notesSection}>
            <Text style={{ fontSize: 8, fontWeight: 700, color: colors.gray500, marginBottom: 4 }}>
              備考
            </Text>
            <Text style={{ fontSize: 8, color: colors.gray600, lineHeight: 1.6 }}>
              {data.notes}
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function generatePurchaseOrderPdf(data: PurchaseOrderData): Promise<Blob> {
  const blob = await pdf(<PurchaseOrderPdf data={data} />).toBlob();
  return blob;
}
