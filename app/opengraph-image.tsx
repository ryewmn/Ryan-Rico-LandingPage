import { ImageResponse } from "next/og";

export const alt = "Ryan Rico — BDC Sales at Round Rock Toyota";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background: "#fafaf7",
          backgroundImage:
            "radial-gradient(ellipse 800px 600px at 80% 20%, rgba(255,179,71,0.35), transparent 60%), radial-gradient(ellipse 700px 500px at 10% 90%, rgba(235,10,30,0.12), transparent 60%)",
          fontFamily: "system-ui, sans-serif",
          color: "#0a0a0a",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "#EB0A1E",
                color: "white",
                fontWeight: 800,
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                letterSpacing: "-0.04em",
              }}
            >
              RR
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Ryan Rico
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#EB0A1E",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#EB0A1E",
              }}
            />
            Live · Round Rock, TX
          </div>
        </div>

        {/* Middle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#EB0A1E",
              marginBottom: 24,
            }}
          >
            BDC Sales / Software / Builds
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              display: "flex",
              alignItems: "baseline",
              gap: 24,
            }}
          >
            <span>Ryan</span>
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                background:
                  "linear-gradient(135deg, #c8141d 0%, #FF6B1A 60%, #1a1a1a 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Rico.
            </span>
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#525252",
              marginTop: 28,
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            BDC Sales at Round Rock Toyota. Internet leads by day, dashboards
            and AI tools by night, Gunpla in between.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#525252",
            marginTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span>github.com/ryewmn</span>
            <span>linkedin.com/in/ryanchristopherrico</span>
            <span>@builds.by.ryry</span>
          </div>
          <div style={{ color: "#0a0a0a", fontWeight: 600 }}>
            ryanchristopher.rico@gmail.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
