import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  text: string;
  buttonLabel?: string;
}

export default function GuideInlineStartCta({
  text,
  buttonLabel = "ケンミツを無料で試す",
}: Props) {
  return (
    <div className="my-8 bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-xl p-5">
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{text}</p>
      <Link
        href="/construction/start"
        className="inline-flex items-center gap-1.5 text-kenmitsu-navy font-bold text-sm hover:underline"
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
