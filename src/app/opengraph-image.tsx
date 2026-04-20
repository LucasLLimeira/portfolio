import fs from "node:fs";
import path from "node:path";
import { cookies, headers } from "next/headers";
import { ImageResponse } from "next/og";

import { DEFAULT_LOCALE, detectLocaleFromHeader, isLocale, LOCALE_COOKIE } from "@/lib/locale";
import type { Locale } from "@/types/content";

export const alt = "Lucas Limeira | FullStack Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const ogContentByLocale: Record<Locale, { badge: string; line1: string; line2: string; stack: string }> = {
  pt: {
    badge: "Desenvolvedor FullStack",
    line1: "Olá, eu sou Lucas,",
    line2: "Desenvolvedor Full Stack.",
    stack: "React · Node.js · TypeScript · APIs REST",
  },
  en: {
    badge: "FullStack Developer",
    line1: "Hi, I'm Lucas,",
    line2: "Full Stack Developer.",
    stack: "React · Node.js · TypeScript · REST APIs",
  },
};

function resolveLocaleFromRequest(cookieValue: string | undefined, acceptLanguage: string | null): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return detectLocaleFromHeader(acceptLanguage) ?? DEFAULT_LOCALE;
}

function getJpegOrientation(buffer: Buffer): number {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return 1;

  let offset = 2;

  while (offset + 1 < buffer.length) {
    if (buffer[offset] !== 0xff) break;

    const marker = buffer[offset + 1];
    if (marker === 0xda || marker === 0xd9) break;

    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (segmentLength < 2) break;

    if (marker === 0xe1 && offset + 2 + segmentLength <= buffer.length) {
      const exifHeader = buffer.toString("ascii", offset + 4, offset + 10);
      if (exifHeader === "Exif\u0000\u0000") {
        const tiffStart = offset + 10;
        const isLittleEndian = buffer.toString("ascii", tiffStart, tiffStart + 2) === "II";
        const readUInt16 = (pos: number) =>
          isLittleEndian ? buffer.readUInt16LE(pos) : buffer.readUInt16BE(pos);
        const readUInt32 = (pos: number) =>
          isLittleEndian ? buffer.readUInt32LE(pos) : buffer.readUInt32BE(pos);

        const ifdOffset = readUInt32(tiffStart + 4);
        const ifdStart = tiffStart + ifdOffset;
        if (ifdStart + 2 > buffer.length) return 1;

        const entries = readUInt16(ifdStart);
        for (let i = 0; i < entries; i += 1) {
          const entryOffset = ifdStart + 2 + i * 12;
          if (entryOffset + 12 > buffer.length) break;

          const tag = readUInt16(entryOffset);
          if (tag === 0x0112) {
            return readUInt16(entryOffset + 8);
          }
        }
      }
    }

    offset += 2 + segmentLength;
  }

  return 1;
}

function orientationToTransform(orientation: number): string {
  switch (orientation) {
    case 2:
      return "scaleX(-1)";
    case 3:
      return "rotate(180deg)";
    case 4:
      return "scaleY(-1)";
    case 5:
      return "rotate(90deg) scaleY(-1)";
    case 6:
      return "rotate(90deg)";
    case 7:
      return "rotate(-90deg) scaleY(-1)";
    case 8:
      return "rotate(-90deg)";
    default:
      return "none";
  }
}

export default async function Image() {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const locale = resolveLocaleFromRequest(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headersStore.get("accept-language"),
  );

  const copy = ogContentByLocale[locale];
  const host = headersStore.get("host") ?? "portfolio-xi-seven-jlsg130m3a.vercel.app";

  const avatarPath = path.join(process.cwd(), "public", "avatar.jpg");
  const avatarBuffer = fs.readFileSync(avatarPath);
  const orientation = getJpegOrientation(avatarBuffer);
  const avatarBase64 = avatarBuffer.toString("base64");
  const avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;
  const avatarTransform = orientationToTransform(orientation);

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
              {copy.badge}
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
            {copy.line1}
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
            {copy.line2}
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
            {copy.stack}
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
            {host}
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
              borderRadius: "50%",
              display: "block",
              transform: avatarTransform,
              transformOrigin: "center center",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
