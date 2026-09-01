import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
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
          background: "#6B2D3C",
          color: "#FBF8F4",
          fontSize: 18,
          fontFamily: "serif",
        }}
      >
        Б
      </div>
    ),
    size,
  );
}
