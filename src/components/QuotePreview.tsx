"use client";

import { QuoteData, TemplateName } from "@/types/quote";
import StandardTemplate from "./templates/StandardTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PremiumTemplate from "./templates/PremiumTemplate";
import { useRef, useState, useEffect } from "react";

interface Props {
  data: QuoteData;
  template: TemplateName;
}

const templateComponents = {
  standard: StandardTemplate,
  minimal: MinimalTemplate,
  premium: PremiumTemplate,
};

export default function QuotePreview({ data, template }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // A4 width = 210mm ≈ 794px
        const newScale = Math.min(containerWidth / 794, 1);
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const Template = templateComponents[template];

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="origin-top-left shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden"
        style={{
          transform: `scale(${scale})`,
          width: "210mm",
          transformOrigin: "top left",
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}
