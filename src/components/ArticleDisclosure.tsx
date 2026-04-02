export default function ArticleDisclosure() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 mb-6 text-xs text-gray-500">
      <span className="font-semibold text-gray-600 mr-1">PR</span>
      この記事にはアフィリエイト広告（A8.net等）が含まれています。詳しくは
      <a href="/ads-policy" className="text-blue-600 hover:underline mx-0.5">
        広告掲載ポリシー
      </a>
      をご覧ください。
    </div>
  );
}
