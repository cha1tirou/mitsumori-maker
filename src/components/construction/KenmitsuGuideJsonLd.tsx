type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  description: string;
  /** URL の末尾部分。 `/construction/guide/[slug]` にマッピングされる。 */
  slug: string;
  datePublished?: string;
  dateModified?: string;
  faqs?: FaqItem[];
};

/**
 * /construction/guide/[slug] 配下の記事用 JSON-LD。ブランドは「ケンミツ」、
 * パンくずは ケンミツ → ガイド → 記事タイトル。
 */
export default function KenmitsuGuideJsonLd({
  title,
  description,
  slug,
  datePublished = "2026-04-26",
  dateModified = "2026-04-26",
  faqs,
}: Props) {
  const url = `https://mitsumori-maker.com/construction/guide/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ケンミツ",
        item: "https://mitsumori-maker.com/construction",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ガイド",
        item: "https://mitsumori-maker.com/construction/guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "ケンミツ",
      url: "https://mitsumori-maker.com/construction",
    },
    publisher: {
      "@type": "Organization",
      name: "ケンミツ",
      url: "https://mitsumori-maker.com/construction",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "ja",
  };

  const faqJsonLd =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
