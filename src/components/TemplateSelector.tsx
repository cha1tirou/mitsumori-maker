"use client";

import { TemplateName } from "@/types/quote";

const templates: { name: TemplateName; label: string; description: string }[] = [
  { name: "standard", label: "スタンダード", description: "ビジネスに最適な定番デザイン" },
  { name: "minimal", label: "ミニマル", description: "シンプルで洗練されたデザイン" },
  { name: "premium", label: "プレミアム", description: "高級感のあるデザイン" },
];

interface Props {
  selected: TemplateName;
  onChange: (template: TemplateName) => void;
}

export default function TemplateSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 sm:gap-3">
      {templates.map((t) => (
        <button
          key={t.name}
          onClick={() => onChange(t.name)}
          className={`group relative flex-1 rounded-xl px-3 py-2.5 sm:px-5 sm:py-3 text-sm font-medium transition-all duration-200 ${
            selected === t.name
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className="block text-center">{t.label}</span>
          <span
            className={`hidden sm:block text-center text-[11px] mt-0.5 ${
              selected === t.name ? "text-white/70" : "text-gray-400"
            }`}
          >
            {t.description}
          </span>
        </button>
      ))}
    </div>
  );
}
