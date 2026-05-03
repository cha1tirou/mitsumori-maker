import Link from "next/link";

export default function AuthorProfile() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mt-10 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            見積書メーカー（個人運営）
          </p>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">
            このサイトは、無料で見積書を作成できるツール「見積書メーカー」を開発・運営する個人開発者が、ツール開発で得た知見と、国税庁・中小企業庁などの公開情報をもとに記事を執筆しています。業界での実務経験はありません。実際の業務上の判断は、税理士・会計士など各分野の専門家にご確認ください。
          </p>
          <Link
            href="/about"
            className="text-blue-600 hover:underline text-xs mt-1 inline-block"
          >
            運営者情報を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
