import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E40AF 0%, #17308A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🏗️
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            ケンミツ
          </span>
        </div>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          建設業の見積書を
          <br />
          月980円で、スマホで、3分で。
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          改正建設業法2025対応 ・ 登録不要で今すぐ試せる
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["労務費内訳", "一式チェッカー", "8工種プリセット", "PDF出力"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "18px",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          mitsumori-maker.com/construction
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
