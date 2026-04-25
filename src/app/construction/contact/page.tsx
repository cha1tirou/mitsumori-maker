import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, ExternalLink } from "lucide-react";
import BackLink from "@/components/construction/BackLink";

export const metadata: Metadata = {
  title: "お問い合わせ | ケンミツ",
  description:
    "ケンミツに関するご質問・ご要望・不具合報告はこちらから。2営業日以内に返信いたします。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/contact",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">お問い合わせ</span>
          </nav>
          <BackLink className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5">
            <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            ← 前のページに戻る
          </BackLink>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          お問い合わせ
        </h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          ケンミツに関するご質問・ご要望・不具合報告を受け付けています。
          <br />
          2営業日以内に返信いたします。
        </p>

        <a
          href="https://forms.gle/hQqmcrtfFCTtrqrRA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          お問い合わせフォームを開く
          <ExternalLink className="w-4 h-4" strokeWidth={2.25} />
        </a>

        <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            よくある質問で解決できるかもしれません
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                href="/construction/faq"
                className="text-kenmitsu-navy hover:underline"
              >
                FAQ（よくある質問）→
              </Link>
            </li>
            <li>
              <Link
                href="/construction/how-to"
                className="text-kenmitsu-navy hover:underline"
              >
                使い方ガイド →
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
