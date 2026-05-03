import { ExternalLink } from "lucide-react";

interface Reference {
  label: string;
  href: string;
  note?: string;
}

interface Props {
  items: Reference[];
}

export default function GuideReferences({ items }: Props) {
  return (
    <section className="my-10 bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-bold text-gray-900 mb-3">参考資料・出典</h2>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        本記事の執筆にあたって参照した公的機関の資料です。最新情報は各公式サイトでご確認ください。
      </p>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href} className="flex items-start gap-2">
            <ExternalLink
              className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-kenmitsu-navy hover:underline font-medium"
              >
                {item.label}
              </a>
              {item.note ? (
                <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
