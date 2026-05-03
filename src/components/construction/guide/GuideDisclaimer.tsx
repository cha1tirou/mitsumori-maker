import { Info } from "lucide-react";

export default function GuideDisclaimer() {
  return (
    <div className="my-8 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg p-5">
      <div className="flex items-start gap-3">
        <Info
          className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
          strokeWidth={2}
        />
        <div className="text-xs text-gray-600 leading-relaxed">
          <p className="font-semibold text-gray-700 mb-1">本記事の位置づけ</p>
          <p>
            本記事は、ケンミツ（建設業向け見積書作成ツール）の運営者が、ツール開発の過程で調査した内容と国土交通省・厚生労働省・建設業法の条文などの公開情報をもとに執筆したものです。建設業界での実務経験に基づくものではありません。記載内容は一般的な情報提供を目的としており、個別の契約・申告・経理判断については、行政書士・建設業経理士・所属する建設業組合などの専門家にご確認ください。
          </p>
        </div>
      </div>
    </div>
  );
}
