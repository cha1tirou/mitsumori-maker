import Link from "next/link";

interface ToolCalloutProps {
  steps: string[];
}

export default function ToolCallout({ steps }: ToolCalloutProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
      <h3 className="text-base font-bold text-blue-900 mb-3">
        見積書メーカーでの設定方法
      </h3>
      <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <Link
        href="/"
        className="inline-block mt-4 text-sm text-blue-700 font-semibold hover:underline"
      >
        見積書メーカーを開く →
      </Link>
    </div>
  );
}
