type GuideJsonLdProps = {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
};

export default function GuideJsonLd({
  title,
  description,
  slug,
  datePublished = "2026-03-31",
  dateModified = "2026-03-31",
}: GuideJsonLdProps) {
  const url = `https://mitsumori-maker.com/guide/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "見積書メーカー",
        item: "https://mitsumori-maker.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ガイド",
        item: "https://mitsumori-maker.com/guide",
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
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      name: "見積書メーカー",
      url: "https://mitsumori-maker.com",
    },
    publisher: {
      "@type": "Organization",
      name: "見積書メーカー",
      url: "https://mitsumori-maker.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "ja",
  };

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
    </>
  );
}
