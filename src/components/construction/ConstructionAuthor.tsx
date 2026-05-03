import Link from "next/link";

export default function ConstructionAuthor() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mt-10 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-kenmitsu-navy rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">K</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            ケンミツ（個人運営）
          </p>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">
            建設業の見積書作成ツール「ケンミツ」を開発・運営する個人開発者が、ツール開発の過程で調査した内容と、国土交通省・厚生労働省・建設業法の条文などの一次情報をもとに記事を執筆しています。建設業界での実務経験はありません。実際の業務上の判断は、行政書士・建設業経理士・所属する建設業組合など各分野の専門家にご確認ください。
          </p>
          <Link
            href="/construction"
            className="text-kenmitsu-navy hover:underline text-xs mt-1 inline-block"
          >
            ケンミツについて
          </Link>
        </div>
      </div>
    </div>
  );
}
