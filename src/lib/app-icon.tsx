import { ImageResponse } from "next/og";

/**
 * App icon: mint "8" on carbon, with the 0x38 bit row at larger sizes.
 * Same byte as the hero figure — not the wordmark (too wide for a square).
 */
const BYTE = [0, 0, 1, 1, 1, 0, 0, 0] as const;

export type AppIconVariant = "any" | "maskable";

export function appIconResponse(size: number, variant: AppIconVariant = "any") {
  const padRatio = variant === "maskable" ? 0.22 : size <= 32 ? 0.1 : 0.14;
  const pad = Math.round(size * padRatio);
  const inner = size - pad * 2;
  const showBits = size >= 180;
  const eightPx = Math.round(showBits ? inner * 0.7 : inner);
  const bit = Math.max(2, Math.round(inner * 0.08));
  const gap = Math.max(1, Math.round(inner * 0.035));

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#d1ffca",
              fontSize: eightPx,
              fontWeight: 700,
              lineHeight: 0.8,
              letterSpacing: "-0.08em",
            }}
          >
            8
          </div>
          {showBits ? (
            <div
              style={{
                display: "flex",
                marginTop: Math.round(inner * 0.08),
                gap,
              }}
            >
              {BYTE.map((on, i) => (
                <div
                  key={i}
                  style={{
                    width: bit,
                    height: bit,
                    borderRadius: Math.max(1, Math.round(bit * 0.22)),
                    background: on ? "#d1ffca" : "#2f2f2f",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
