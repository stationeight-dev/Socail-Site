import { ImageResponse } from "next/og";

export const alt = "Station Eight Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title =
    locale === "fr"
      ? "Un laboratoire pour les logiciels qui tiennent."
      : "A station for software that has to hold.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e5e5e5",
          color: "#000000",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 99,
                background: i % 2 === 0 ? "#d1ffca" : "#000000",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
            Station Eight Labs
          </div>
          <div
            style={{
              fontSize: 56,
              marginTop: 16,
              maxWidth: 980,
              lineHeight: 0.92,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
