"use client";

import { QuoteData, TemplateName } from "@/types/quote";
import StandardTemplate from "./templates/StandardTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PremiumTemplate from "./templates/PremiumTemplate";
import BlueTemplate from "./templates/BlueTemplate";
import MonoTemplate from "./templates/MonoTemplate";
import ColorfulTemplate from "./templates/ColorfulTemplate";
import ConstructionTemplate from "./templates/ConstructionTemplate";
import LinedTemplate from "./templates/LinedTemplate";
import { useRef, useState, useEffect } from "react";

interface Props {
  data: QuoteData;
  template: TemplateName;
}

const templateComponents = {
  standard: StandardTemplate,
  minimal: MinimalTemplate,
  premium: PremiumTemplate,
  blue: BlueTemplate,
  mono: MonoTemplate,
  colorful: ColorfulTemplate,
  construction: ConstructionTemplate,
  lined: LinedTemplate,
};

export default function QuotePreview({ data, template }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth > 0) {
          const newScale = Math.min(containerWidth / 794, 1);
          setScale(newScale);
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    // hidden→表示の切り替え時にも再計算するためResizeObserverを使用
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      observer.disconnect();
    };
  }, []);

  const Template = templateComponents[template];

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="origin-top-left shadow-2xl shadow-gray-300/50 rounded-lg overflow-hidden"
        style={{
          transform: `scale(${scale})`,
          width: "210mm",
          height: `${297 * scale}mm`,
          transformOrigin: "top left",
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}
