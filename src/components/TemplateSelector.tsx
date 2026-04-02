"use client";

import { TemplateName } from "@/types/quote";

const templates: { name: TemplateName; label: string; color: string }[] = [
  { name: "standard", label: "スタンダード", color: "bg-gray-800" },
  { name: "minimal", label: "ミニマル", color: "bg-gray-400" },
  { name: "premium", label: "プレミアム", color: "bg-gradient-to-r from-gray-800 to-red-500" },
  { name: "blue", label: "ブルー", color: "bg-blue-600" },
  { name: "mono", label: "モノクロ", color: "bg-black" },
  { name: "colorful", label: "カラフル", color: "bg-gradient-to-r from-orange-400 to-pink-500" },
  { name: "construction", label: "建設業向け", color: "bg-green-700" },
  { name: "lined", label: "罫線", color: "bg-gray-600" },
];

interface Props {
  selected: TemplateName;
  onChange: (template: TemplateName) => void;
}

export default function TemplateSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {templates.map((t) => (
        <button
          key={t.name}
          onClick={() => onChange(t.name)}
          className={`rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
            selected === t.name
              ? "bg-primary text-white shadow-md shadow-primary/25"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${t.color} flex-shrink-0`} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
