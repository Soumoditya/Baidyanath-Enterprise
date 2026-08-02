import { ImageResponse } from "next/og";

export const alt =
  "Baidyanath Enterprise — Trusted FMCG, Healthcare & Cleaning Products Distributor in Rampurhat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded link preview for WhatsApp, Facebook, X, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #dbeafe 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
            display: "flex",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 28,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 60%, #1e3a8a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="66" height="66" viewBox="0 0 32 32" fill="none">
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 800, color: "#0f172a" }}>
              Baidyanath Enterprise
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: "#2563eb",
                letterSpacing: 6,
                marginTop: 10,
              }}
            >
              RAMPURHAT · BIRBHUM
            </div>
          </div>
        </div>

        {/* Headline — each line is its own single-child div (Satori requires
            explicit display on any element with more than one child). */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 800, color: "#0f172a" }}>
            Genuine Products,
          </div>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 800, color: "#0f172a" }}>
            Delivered On Time
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#475569", marginTop: 14 }}>
            FMCG · Healthcare · Cleaning · Household
          </div>
        </div>

        {/* Trust chips */}
        <div style={{ display: "flex", gap: 16 }}>
          {["100% Genuine", "Best Prices", "Timely Delivery"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                border: "2px solid #bfdbfe",
                color: "#1d4ed8",
                fontSize: 26,
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: 999,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
