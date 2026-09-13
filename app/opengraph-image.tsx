import { ImageResponse } from "next/og";
export const alt = "Yash Rana — Software Developer & AI / ML Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#141510",
        color: "#eeeae1",
        width: "100%",
        height: "100%",
        padding: "70px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 24, display: "flex" }}>
        Yash Rana / Software developer · AI / ML
      </div>
      <div
        style={{
          fontSize: 100,
          letterSpacing: -5,
          lineHeight: 1.05,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Intelligence</span>
        <span style={{ color: "#ed9c65" }}>in motion.</span>
      </div>
      <div style={{ fontSize: 22, color: "#b4b7a5", display: "flex" }}>
        Montréal, Canada · Applied ML & software
      </div>
    </div>,
    size,
  );
}
