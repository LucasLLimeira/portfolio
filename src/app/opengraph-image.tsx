import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Lucas Limeira | FullStack Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const avatarPath = path.join(process.cwd(), "public", "avatar.jpg");
  const avatarBase64 = fs.readFileSync(avatarPath).toString("base64");
  const avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 55%, #071a3a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow behind photo */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: 60,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Left — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            paddingRight: 60,
          }}
        >
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
              Desenvolvedor FullStack
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#f1f5f9",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Olá, eu sou Lucas,
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#f1f5f9",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            Desenvolvedor Full Stack.
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
              fontSize: 22,
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: 620,
            }}
          >
            React · Node.js · TypeScript · APIs REST
          </div>

          {/* Domain */}
          <div
            style={{
              marginTop: 32,
              fontSize: 18,
              color: "#475569",
              letterSpacing: "0.04em",
            }}
          >
            portfolio-xi-seven-jlsg130m3a.vercel.app
          </div>
        </div>

        {/* Right — avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "3px solid rgba(96,165,250,0.45)",
            background: "linear-gradient(to bottom, #1e293b, #0f172a)",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt="Lucas Limeira"
            width={280}
            height={280}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 38%",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
