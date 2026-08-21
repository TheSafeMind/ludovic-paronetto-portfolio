import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0F",
          color: "#F5F3FF",
          fontFamily: "Arial, sans-serif",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-2px",
        }}
      >
        LP<span style={{ color: "#D4AF37" }}>.</span>
      </div>
    ),
    size,
  );
}
