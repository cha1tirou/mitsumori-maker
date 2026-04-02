import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "見積書メーカー";
  const subtitle =
    searchParams.get("subtitle") || "無料・登録不要の見積書作成ツール";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "60px",
        }}
      >
        {/* カード */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            borderRadius: "24px",
            padding: "60px 80px",
            width: "100%",
            height: "100%",
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          }}
        >
          {/* ロゴ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              見
            </div>
            <span
              style={{
                fontSize: "20px",
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              見積書メーカー
            </span>
          </div>

          {/* タイトル */}
          <h1
            style={{
              fontSize: title.length > 20 ? "42px" : "48px",
              fontWeight: 700,
              color: "#111827",
              textAlign: "center",
              lineHeight: 1.3,
              margin: "0 0 20px 0",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          {/* サブタイトル */}
          <p
            style={{
              fontSize: "22px",
              color: "#6b7280",
              textAlign: "center",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
