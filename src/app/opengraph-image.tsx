import { ImageResponse } from "next/og";

export const alt = "Lucas Limeira | FullStack Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #071a3a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Role badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 28,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(96,165,250,0.35)",
            borderRadius: 999,
            padding: "8px 22px",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#93c5fd",
            }}
          >
            Full Stack Developer
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#f1f5f9",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Lucas Limeira
        </div>

        {/* Divider */}
        <div
          style={{
            width: 64,
            height: 4,
            borderRadius: 4,
            background: "#3b82f6",
            marginBottom: 24,
          }}
        />

        {/* Short bio */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: 760,
          }}
        >
          React · Node.js · TypeScript · APIs REST
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 80,
            fontSize: 20,
            color: "#475569",
            letterSpacing: "0.04em",
          }}
        >
          portfolio-xi-seven-jlsg130m3a.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
