import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import {
  ConstructionQuoteData,
  CostCategory,
  costCategoryLabels,
} from "@/types/construction";
import { calcConstructionTotals, itemAmount } from "@/lib/constructionCalc";

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/fonts/noto-sans-jp-400.woff",
      fontWeight: 400,
    },
    {
      src: "/fonts/noto-sans-jp-700.woff",
      fontWeight: 700,
    },
  ],
});

const colors = {
  primary: "#1E40AF",
  primaryDark: "#17308A",
  primaryLight: "#EEF3FF",
  accent: "#1E40AF",
  primaryBorder: "#DCE6FF",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  white: "#ffffff",
  labor: { bg: "#fef3c7", fg: "#92400e" },
  material: { bg: "#dbeafe", fg: "#1e40af" },
  outsourcing: { bg: "#f3e8ff", fg: "#6b21a8" },
  other: { bg: "#f3f4f6", fg: "#374151" },
};

const categoryStyle: Record<CostCategory, { bg: string; fg: string }> = {
  labor: colors.labor,
  material: colors.material,
  outsourcing: colors.outsourcing,
  other: colors.other,
};

function formatCurrency(n: number): string {
  return `¥${Math.round(n).toLocaleString("ja-JP")}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return "—";
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function calcExpiryDate(quoteDate: string, days: number): string {
  if (!quoteDate || !days) return "—";
  const d = new Date(quoteDate + "T00:00:00");
  if (isNaN(d.getTime())) return "—";
  d.setDate(d.getDate() + days);
  return formatDate(d.toISOString().split("T")[0]);
}

const s = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    fontSize: 9,
    color: colors.gray800,
    padding: "12mm",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.primary,
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 4,
  },
  divider: {
    width: 70,
    height: 2,
    backgroundColor: colors.primary,
    marginBottom: 14,
    alignSelf: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  leftCol: { width: "55%" },
  rightCol: { width: "40%" },
  clientName: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 3,
    marginBottom: 2,
  },
  clientSub: { fontSize: 8, color: colors.gray600 },
  infoBox: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderRadius: 3,
    padding: 8,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.primary,
    width: 50,
  },
  infoValue: { fontSize: 8, color: colors.gray700, flex: 1 },
  leadText: { fontSize: 9, marginTop: 10 },
  totalBox: {
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  totalLabel: { fontSize: 8, color: colors.primaryBorder, marginBottom: 2 },
  totalAmount: { fontSize: 17, fontWeight: 700, color: colors.white },
  companyName: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.primary,
    textAlign: "right",
    marginBottom: 3,
  },
  companyInfo: {
    fontSize: 8,
    color: colors.gray600,
    textAlign: "right",
    lineHeight: 1.5,
  },
  smallInfo: {
    fontSize: 7,
    color: colors.gray500,
    textAlign: "right",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  th: {
    color: colors.white,
    fontSize: 8,
    fontWeight: 700,
  },
  sectionHeader: {
    flexDirection: "row",
    backgroundColor: colors.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderTopWidth: 0.5,
    borderTopColor: colors.primaryBorder,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.primaryDark,
    flex: 1,
  },
  sectionTotal: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.primaryDark,
    width: 80,
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 0.25,
    borderBottomColor: colors.gray200,
    alignItems: "center",
  },
  tableRowAlt: { backgroundColor: colors.gray50 },
  td: { fontSize: 8 },
  categoryBadge: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 2,
    fontSize: 7,
    fontWeight: 700,
    textAlign: "center",
  },
  summaryBox: {
    alignSelf: "flex-end",
    width: 240,
    marginTop: 10,
    marginBottom: 14,
  },
  breakdownBox: {
    backgroundColor: colors.gray50,
    borderWidth: 0.5,
    borderColor: colors.gray200,
    borderRadius: 3,
    padding: 6,
    marginBottom: 4,
  },
  breakdownTitle: {
    fontSize: 7,
    fontWeight: 700,
    color: colors.gray600,
    marginBottom: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  summaryLabel: { fontSize: 8, color: colors.gray600 },
  summaryValue: { fontSize: 8, color: colors.gray800 },
  legalWelfareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  legalWelfareLabel: {
    fontSize: 8,
    color: colors.primaryDark,
    fontWeight: 700,
  },
  legalWelfareValue: {
    fontSize: 8,
    color: colors.primaryDark,
    fontWeight: 700,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderTopWidth: 0.5,
    borderTopColor: colors.gray200,
    marginTop: 3,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderTopWidth: 1.5,
    borderTopColor: colors.primary,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.primary,
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.primary,
  },
  conditionsBox: {
    borderWidth: 0.5,
    borderColor: colors.gray200,
    borderRadius: 3,
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.gray50,
  },
  conditionTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.gray700,
    marginBottom: 3,
  },
  conditionLine: {
    fontSize: 8,
    color: colors.gray700,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  notesSection: {
    borderTopWidth: 0.5,
    borderTopColor: colors.gray200,
    paddingTop: 8,
    marginTop: 4,
  },
  notesLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: colors.gray500,
    marginBottom: 3,
  },
  notesText: {
    fontSize: 8,
    color: colors.gray700,
    lineHeight: 1.5,
  },
});

function renderItemRow(
  item: import("@/types/construction").ConstructionItem,
  indexLabel: string,
  alt: boolean,
  indentPaddingLeft: number
) {
  const cat = categoryStyle[item.category];
  return (
    <View
      key={item.id}
      style={[
        s.tableRow,
        ...(alt ? [s.tableRowAlt] : []),
        { paddingLeft: 4 + indentPaddingLeft },
      ]}
    >
      <Text style={[s.td, { width: 26 - indentPaddingLeft / 2, color: colors.gray500 }]}>
        {indexLabel}
      </Text>
      <View style={{ width: 50 }}>
        <Text
          style={[
            s.categoryBadge,
            { backgroundColor: cat.bg, color: cat.fg },
          ]}
        >
          {costCategoryLabels[item.category]}
        </Text>
      </View>
      <Text style={[s.td, { flex: 1 }]}>{item.name || "—"}</Text>
      <Text style={[s.td, { width: 34, textAlign: "right" }]}>
        {item.quantity}
      </Text>
      <Text style={[s.td, { width: 28, textAlign: "center" }]}>
        {item.unit}
      </Text>
      <Text style={[s.td, { width: 60, textAlign: "right" }]}>
        {formatCurrency(item.unitPrice)}
      </Text>
      <Text
        style={[
          s.td,
          { width: 74, textAlign: "right", fontWeight: 700 },
        ]}
      >
        {formatCurrency(itemAmount(item))}
      </Text>
    </View>
  );
}

function WatermarkOverlay() {
  const textStyle = {
    fontSize: 80,
    color: "#1E40AF",
    opacity: 0.25,
    transform: "rotate(-30deg)",
    fontWeight: 700,
    letterSpacing: 10,
  };
  return (
    <View
      fixed
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "25%",
        paddingBottom: "20%",
      }}
    >
      <Text style={textStyle}>SAMPLE</Text>
      <Text style={textStyle}>SAMPLE</Text>
      <Text style={textStyle}>SAMPLE</Text>
    </View>
  );
}

function FooterWatermark() {
  return (
    <View
      fixed
      style={{
        position: "absolute",
        bottom: "6mm",
        left: "12mm",
        right: "12mm",
        borderTopWidth: 0.5,
        borderTopColor: "#d1d5db",
        paddingTop: 4,
      }}
    >
      <Text style={{ fontSize: 8, color: "#6b7280", textAlign: "center" }}>
        ケンミツ 無料版で作成 ｜ 透かしなしの正式版は月¥980（Solo）から / mitsumori-maker.com/construction
      </Text>
    </View>
  );
}

function ConstructionPdf({
  data,
  watermark,
}: {
  data: ConstructionQuoteData;
  watermark: boolean;
}) {
  const totals = calcConstructionTotals(data);
  const photos = data.sitePhotos ?? [];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {watermark ? <WatermarkOverlay /> : null}
        {watermark ? <FooterWatermark /> : null}
        {/* タイトル */}
        <Text style={s.title}>工事見積書</Text>
        <View style={s.divider} />

        {/* ヘッダー情報 */}
        <View style={s.headerRow}>
          <View style={s.leftCol}>
            <Text style={s.clientName}>
              {data.clientName || "（発注者）"} {data.clientTitle}
            </Text>
            {data.clientContact ? (
              <Text style={s.clientSub}>{data.clientContact}</Text>
            ) : null}

            <View style={s.infoBox}>
              {data.subject ? (
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>工事名</Text>
                  <Text style={s.infoValue}>{data.subject}</Text>
                </View>
              ) : null}
              {data.siteAddress ? (
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>工事場所</Text>
                  <Text style={s.infoValue}>{data.siteAddress}</Text>
                </View>
              ) : null}
              {data.constructionPeriod ? (
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>工事期間</Text>
                  <Text style={s.infoValue}>{data.constructionPeriod}</Text>
                </View>
              ) : null}
              {data.designDocument ? (
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>設計図書</Text>
                  <Text style={s.infoValue}>{data.designDocument}</Text>
                </View>
              ) : null}
              {data.paymentTerms ? (
                <View style={s.infoRow}>
                  <Text style={s.infoLabel}>支払条件</Text>
                  <Text style={s.infoValue}>{data.paymentTerms}</Text>
                </View>
              ) : null}
            </View>

            <Text style={s.leadText}>下記の通りお見積り申し上げます。</Text>

            <View style={s.totalBox}>
              <Text style={s.totalLabel}>お見積り金額（税込）</Text>
              <Text style={s.totalAmount}>{formatCurrency(totals.total)}</Text>
            </View>
          </View>

          <View style={s.rightCol}>
            <Text style={s.companyName}>
              {data.companyName || "（施工者）"}
            </Text>
            {data.companyContact ? (
              <Text style={s.companyInfo}>担当: {data.companyContact}</Text>
            ) : null}
            {data.companyZip ? (
              <Text style={s.companyInfo}>〒{data.companyZip}</Text>
            ) : null}
            {data.companyAddress ? (
              <Text style={s.companyInfo}>{data.companyAddress}</Text>
            ) : null}
            {data.companyTel ? (
              <Text style={s.companyInfo}>TEL: {data.companyTel}</Text>
            ) : null}
            {data.companyEmail ? (
              <Text style={s.companyInfo}>{data.companyEmail}</Text>
            ) : null}
            {data.constructionLicenseNumber ? (
              <Text style={s.smallInfo}>{data.constructionLicenseNumber}</Text>
            ) : null}
            {data.companyRegistrationNumber ? (
              <Text style={s.smallInfo}>
                登録番号: {data.companyRegistrationNumber}
              </Text>
            ) : null}
            <View style={{ marginTop: 6 }}>
              {data.quoteNumber ? (
                <Text style={s.companyInfo}>見積番号: {data.quoteNumber}</Text>
              ) : null}
              <Text style={s.companyInfo}>
                見積日: {formatDate(data.quoteDate)}
              </Text>
              <Text style={s.companyInfo}>
                有効期限: {calcExpiryDate(data.quoteDate, data.validityDays)}
              </Text>
            </View>
          </View>
        </View>

        {/* テーブルヘッダ */}
        <View style={s.tableHeader}>
          <Text style={[s.th, { width: 26 }]}>#</Text>
          <Text style={[s.th, { width: 50 }]}>費目</Text>
          <Text style={[s.th, { flex: 1 }]}>工事項目</Text>
          <Text style={[s.th, { width: 34, textAlign: "right" }]}>数量</Text>
          <Text style={[s.th, { width: 28, textAlign: "center" }]}>単位</Text>
          <Text style={[s.th, { width: 60, textAlign: "right" }]}>単価</Text>
          <Text style={[s.th, { width: 74, textAlign: "right" }]}>金額</Text>
        </View>

        {/* セクション別明細 */}
        {data.sections.map((section, sectionIndex) => {
          const sectionTotal = totals.sectionTotals.find(
            (t) => t.sectionId === section.id
          );
          return (
            <View key={section.id} wrap={false}>
              <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>
                  ■ {sectionIndex + 1}. {section.name || "（無題セクション）"}
                </Text>
                <Text style={s.sectionTotal}>
                  {formatCurrency(sectionTotal?.subtotal ?? 0)}
                </Text>
              </View>
              {section.items.map((item, itemIndex) =>
                renderItemRow(item, `${sectionIndex + 1}-${itemIndex + 1}`, itemIndex % 2 === 1, 0)
              )}
              {(section.subsections ?? []).map((sub, subIndex) => {
                let subAmount = 0;
                sub.items.forEach((i) => (subAmount += itemAmount(i)));
                return (
                  <View key={sub.id}>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#EEF3FF",
                        paddingVertical: 3,
                        paddingHorizontal: 16,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#DCE6FF",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          color: colors.primaryDark,
                          flex: 1,
                        }}
                      >
                        ◇ {sectionIndex + 1}-{subIndex + 1} {sub.name || "（無題）"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          color: colors.primaryDark,
                          width: 74,
                          textAlign: "right",
                        }}
                      >
                        {formatCurrency(subAmount)}
                      </Text>
                    </View>
                    {sub.items.map((item, itemIndex) =>
                      renderItemRow(
                        item,
                        `${sectionIndex + 1}-${subIndex + 1}-${itemIndex + 1}`,
                        itemIndex % 2 === 1,
                        10
                      )
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* 集計 */}
        <View style={s.summaryBox}>
          <View style={s.breakdownBox}>
            <Text style={s.breakdownTitle}>費目内訳（直接工事費）</Text>
            {(Object.keys(totals.byCategory) as CostCategory[]).map((cat) => {
              const amount = totals.byCategory[cat];
              if (amount === 0) return null;
              return (
                <View key={cat} style={s.summaryRow}>
                  <Text style={s.summaryLabel}>{costCategoryLabels[cat]}</Text>
                  <Text style={s.summaryValue}>{formatCurrency(amount)}</Text>
                </View>
              );
            })}
            <View style={s.subtotalRow}>
              <Text style={[s.summaryLabel, { fontWeight: 700 }]}>
                直接工事費 計
              </Text>
              <Text style={[s.summaryValue, { fontWeight: 700 }]}>
                {formatCurrency(totals.directCost)}
              </Text>
            </View>
          </View>

          {data.enableLegalWelfare && totals.legalWelfare > 0 ? (
            <View style={s.legalWelfareRow}>
              <Text style={s.legalWelfareLabel}>
                法定福利費（労務費×{data.legalWelfareRate}%）
              </Text>
              <Text style={s.legalWelfareValue}>
                {formatCurrency(totals.legalWelfare)}
              </Text>
            </View>
          ) : null}

          {data.enableOverhead && totals.siteManagementFee > 0 ? (
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>
                現場管理費（{data.siteManagementFeeRate}%）
              </Text>
              <Text style={s.summaryValue}>
                {formatCurrency(totals.siteManagementFee)}
              </Text>
            </View>
          ) : null}

          {data.enableOverhead && totals.generalManagementFee > 0 ? (
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>
                一般管理費（{data.generalManagementFeeRate}%）
              </Text>
              <Text style={s.summaryValue}>
                {formatCurrency(totals.generalManagementFee)}
              </Text>
            </View>
          ) : null}

          <View style={s.subtotalRow}>
            <Text style={s.summaryLabel}>小計</Text>
            <Text style={s.summaryValue}>{formatCurrency(totals.subtotal)}</Text>
          </View>
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>消費税（{data.taxRate}%）</Text>
            <Text style={s.summaryValue}>{formatCurrency(totals.tax)}</Text>
          </View>
          <View style={s.grandTotal}>
            <Text style={s.grandTotalLabel}>合計（税込）</Text>
            <Text style={s.grandTotalValue}>{formatCurrency(totals.total)}</Text>
          </View>
        </View>

        {/* 見積条件 */}
        {(data.warrantyPeriod ||
          data.warrantyScope ||
          data.additionalWorkPolicy) && (
          <View style={s.conditionsBox}>
            {data.warrantyPeriod || data.warrantyScope ? (
              <View style={{ marginBottom: 6 }}>
                <Text style={s.conditionTitle}>
                  ◆ 瑕疵担保責任・アフターサービス
                </Text>
                {data.warrantyPeriod ? (
                  <Text style={s.conditionLine}>
                    保証期間: {data.warrantyPeriod}
                  </Text>
                ) : null}
                {data.warrantyScope ? (
                  <Text style={s.conditionLine}>{data.warrantyScope}</Text>
                ) : null}
              </View>
            ) : null}
            {data.additionalWorkPolicy ? (
              <View>
                <Text style={s.conditionTitle}>
                  ◆ 追加工事・設計変更の取扱い
                </Text>
                <Text style={s.conditionLine}>{data.additionalWorkPolicy}</Text>
              </View>
            ) : null}
          </View>
        )}

        {data.notes ? (
          <View style={s.notesSection}>
            <Text style={s.notesLabel}>備考</Text>
            <Text style={s.notesText}>{data.notes}</Text>
          </View>
        ) : null}
      </Page>

      {/* 工事写真シート */}
      {photos.length > 0 ? (
        <Page size="A4" style={s.page}>
          {watermark ? <WatermarkOverlay /> : null}
          {watermark ? <FooterWatermark /> : null}
          <Text style={[s.title, { fontSize: 16, letterSpacing: 4 }]}>
            工事写真・現場状況
          </Text>
          <View style={[s.divider, { marginBottom: 16 }]} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {photos.map((photo, i) => (
              <View
                key={photo.id}
                style={{
                  width: "48%",
                  marginBottom: 8,
                  borderWidth: 0.5,
                  borderColor: colors.gray200,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={photo.dataUrl}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                  }}
                />
                {photo.caption ? (
                  <Text
                    style={{
                      fontSize: 8,
                      color: colors.gray700,
                      padding: 4,
                      backgroundColor: colors.gray50,
                    }}
                  >
                    {photo.caption}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </Page>
      ) : null}
    </Document>
  );
}

export async function generateConstructionPdf(
  data: ConstructionQuoteData,
  options?: { watermark?: boolean }
): Promise<Blob> {
  const blob = await pdf(
    <ConstructionPdf data={data} watermark={options?.watermark ?? true} />
  ).toBlob();
  return blob;
}
