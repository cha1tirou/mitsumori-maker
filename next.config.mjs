/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ケンミツ向けガイド記事は /construction/guide/ 配下に移動（2026-04-26）
      // 旧 URL は 301 で永続リダイレクトして既存の被リンク・SEO 評価を引き継ぐ
      {
        source: "/guide/kaisei-kensetsu-2025",
        destination: "/construction/guide/kaisei-kensetsu-2025",
        permanent: true,
      },
      {
        source: "/guide/legal-welfare",
        destination: "/construction/guide/legal-welfare",
        permanent: true,
      },
      {
        source: "/guide/labor-cost",
        destination: "/construction/guide/labor-cost",
        permanent: true,
      },
      {
        source: "/guide/lump-sum",
        destination: "/construction/guide/lump-sum",
        permanent: true,
      },
      {
        source: "/guide/freelance-law-construction",
        destination: "/construction/guide/freelance-law-construction",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
