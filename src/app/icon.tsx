import { ImageResponse } from "next/og";

// Real PNG favicon — SVG-only icons render blank in several browsers and on Android.
export const size = { width: 192, height: 192 };
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
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 55%, #1e3a8a 100%)",
          borderRadius: 42,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
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
