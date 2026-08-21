import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background: "#0B0B0F",
          color: "#F5F3FF",
          fontFamily: "Arial, sans-serif",
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: "-6px",
        }}
      >
        LP<span style={{ color: "#D4AF37" }}>.</span>
      </div>
    ),
    size,
  );
}
