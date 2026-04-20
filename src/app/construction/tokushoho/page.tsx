import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | ケンミツ",
  description:
    "ケンミツ（建設業向け有料プラン）の特定商取引法に基づく表記です。販売事業者・料金・支払方法・解約条件などを記載しています。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/tokushoho",
  },
  robots: { index: true, follow: true },
};

const businessInfo = {
  name: "宇野 想一郎",
  representative: "宇野 想一郎",
  address: "〒150-0021 東京都渋谷区恵比寿西2丁目4番8号 ウィンド恵比寿ビル8F",
  phone: "050-1793-1278",
  email: "kenmitsu.support@gmail.com",
};

const IS_PUBLISHED = true;

export default function ConstructionTokushohoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">特定商取引法に基づく表記</span>
          </nav>
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            ← ケンミツトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            特定商取引法に基づく表記
          </h1>

          {!IS_PUBLISHED && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle
                className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                strokeWidth={2.25}
              />
              <div className="text-sm text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">現在、有料プラン提供の準備中です</p>
                <p className="text-xs">
                  事業者情報の公開にあたり、バーチャルオフィスの契約手続きを進めております。Stripe 決済の本番利用開始時に正式な事業者情報を公開します。
                </p>
              </div>
            </div>
          )}

          <table className="w-full text-sm border-collapse">
            <tbody className="[&>tr]:border-b [&>tr]:border-gray-200 [&>tr:last-child]:border-0">
              <Row label="販売事業者" value={businessInfo.name} />
              <Row label="運営責任者" value={businessInfo.representative} />
              <Row label="所在地" value={businessInfo.address} />
              <Row label="電話番号" value={businessInfo.phone} />
              <Row label="メールアドレス" value={businessInfo.email} />

              <Row
                label="販売価格"
                value={
                  <div className="space-y-1">
                    <p>Solo プラン: 月額 ¥980（税込） / 年額 ¥9,800（税込）</p>
                    <p>Team プラン: 月額 ¥2,980（税込） / 年額 ¥29,800（税込）</p>
                  </div>
                }
              />
              <Row
                label="販売価格以外の費用"
                value="通信費（お客様のインターネット接続回線に要する費用）はお客様の負担となります。"
              />
              <Row
                label="支払方法"
                value="クレジットカード（Stripe 決済）"
              />
              <Row
                label="支払時期"
                value="初回申込時および以降の更新日に自動課金されます。"
              />
              <Row
                label="サービス提供時期"
                value="クレジットカード決済完了後、即時にサービスをご利用いただけます。"
              />
              <Row
                label="解約・自動更新停止"
                value={
                  <>
                    マイページの解約導線より、いつでも自動更新を停止できます。解約手続き後も当該課金サイクル末日まで有料プランを利用可能です。
                  </>
                }
              />
              <Row
                label="返金・キャンセル"
                value="原則として途中解約による日割り返金は行いません。ただし、本サービスの重大な不具合により実質的に利用できなかった場合は個別対応いたします。特定商取引法に基づくクーリング・オフの適用はありません（サービス提供は即時開始のため）。"
              />
              <Row
                label="動作環境"
                value={
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>
                      推奨ブラウザ: Google Chrome / Safari / Microsoft Edge の最新版
                    </p>
                    <p>デバイス: PC / タブレット / スマートフォン</p>
                    <p>
                      JavaScript および Cookie が有効であること
                    </p>
                  </div>
                }
              />
              <Row
                label="利用規約"
                value={
                  <Link
                    href="/construction/terms"
                    className="text-kenmitsu-navy hover:underline"
                  >
                    利用規約（建設業向け有料プラン）
                  </Link>
                }
              />
              <Row
                label="プライバシーポリシー"
                value={
                  <Link
                    href="/construction/privacy"
                    className="text-kenmitsu-navy hover:underline"
                  >
                    プライバシーポリシー
                  </Link>
                }
              />
            </tbody>
          </table>

          <p className="text-xs text-gray-500 mt-10 pt-6 border-t border-gray-200">
            最終改定日: 2026年4月20日
          </p>
        </article>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <tr>
      <th className="py-3 pr-4 text-left align-top text-xs font-bold text-gray-600 w-40">
        {label}
      </th>
      <td className="py-3 text-sm text-gray-800 leading-relaxed">{value}</td>
    </tr>
  );
}
