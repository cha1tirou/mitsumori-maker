import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function GuideScreenshotSlot({
  src,
  alt,
  caption,
  width = 1200,
  height = 750,
}: Props) {
  if (!src) {
    return (
      <figure className="my-8">
        <div
          className="aspect-[16/10] w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
          aria-label={alt}
        >
          <span className="text-xs text-gray-400 px-4 text-center leading-relaxed">
            ［ケンミツの画面スクリーンショット予定地］
            <br />
            {alt}
          </span>
        </div>
        {caption ? (
          <figcaption className="mt-2 text-xs text-gray-500 text-center">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
