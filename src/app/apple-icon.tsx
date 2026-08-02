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
          // Apple masks corners itself, so keep the tile square and filled.
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 55%, #1e3a8a 100%)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="6" width="17" height="8.5" rx="3" fill="#ffffff" fillOpacity="0.95" />
          <rect x="6" y="17.5" width="20" height="8.5" rx="3" fill="#ffffff" fillOpacity="0.82" />
          <path
            d="M10.5 21.8l2.4 2.4 4.6-4.9"
            stroke="#1d4ed8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
