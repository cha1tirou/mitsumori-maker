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
            見積書メーカー 編集部
          </p>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">
            中小企業の経理実務経験をもとに、見積書・請求書・納品書の作成ノウハウを発信しています。年間1万件以上の見積書作成に利用されている「見積書メーカー」を開発・運営。実務で本当に役立つ情報を、ツール開発者の視点からお届けします。
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
