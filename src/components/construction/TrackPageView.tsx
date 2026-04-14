"use client";

import { useEffect } from "react";
import { trackConversion, ConversionName } from "@/lib/analytics";

interface Props {
  name: ConversionName;
}

export default function TrackPageView({ name }: Props) {
  useEffect(() => {
    trackConversion(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
