import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function FeedbackCard() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-700" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">ご意見・ご要望</h2>
          <p className="text-[11px] text-gray-500">
            ご感想・バグ報告・機能要望・改善提案はお問い合わせフォームへ
          </p>
        </div>
      </div>

      <ul className="text-xs text-gray-600 space-y-1.5 mb-4 pl-1">
        <li>・ご意見・ご感想</li>
        <li>・バグ報告</li>
        <li>・機能要望</li>
        <li>・改善提案</li>
      </ul>

      <Link
        href="/construction/contact"
        className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
      >
        お問い合わせフォームへ
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </Link>
    </section>
  );
}
