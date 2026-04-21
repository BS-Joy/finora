import { useState, useEffect } from "react";

// Finora Login Page — Google Sign-In Only
// Colors from FinFlow UI:
//   Primary Lime:   #CBEF43
//   Dark Green:     #1A2E1A
//   Background:     #F5F5EF
//   Text dark:      #1A1A1A

const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CBEF43"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "Track Every Rupee",
    desc: "Log income & expenses manually. Full control, zero automation.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CBEF43"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Monthly Budgets",
    desc: "Set spending limits per category and stay on track.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CBEF43"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Clear Insights",
    desc: "Visual reports that show where your money actually goes.",
  },
];

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F5EF",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Left Panel ── */}
      <div
        style={{
          width: isMobile ? "100%" : "45%",
          minHeight: isMobile ? "auto" : "100vh",
          backgroundColor: "#1A2E1A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: isMobile ? "32px 28px 36px" : "48px 52px",
          position: "relative",
          overflow: "hidden",
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translate(0,0)"
            : isMobile
              ? "translateY(-30px)"
              : "translateX(-40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(203,239,67,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(203,239,67,0.05)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(203,239,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(203,239,67,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#CBEF43",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "16px",
              color: "#1A2E1A",
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            FN
          </div>
          <span
            style={{
              color: "#F5F5EF",
              fontWeight: 700,
              fontSize: "22px",
              letterSpacing: "-0.5px",
            }}
          >
            Finora
          </span>
        </div>

        {/* Feature highlights */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: isMobile ? "32px" : "0",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          <p
            style={{
              color: "rgba(203,239,67,0.6)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "20px",
            }}
          >
            What you get
          </p>

          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: i < features.length - 1 ? "20px" : 0,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.7s ease ${0.4 + i * 0.15}s, transform 0.7s ease ${0.4 + i * 0.15}s`,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(203,239,67,0.08)",
                  border: "1px solid rgba(203,239,67,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <p
                  style={{
                    color: "#F5F5EF",
                    fontWeight: 700,
                    fontSize: "14px",
                    margin: "0 0 3px",
                  }}
                >
                  {f.title}
                </p>
                <p
                  style={{
                    color: "rgba(245,245,239,0.45)",
                    fontSize: "13px",
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(203,239,67,0.1)",
              margin: "24px 0",
            }}
          />

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex" }}>
              {["#4A7C59", "#2D5A3D", "#6B9E7A", "#1A4A2E"].map((bg, i) => (
                <div
                  key={i}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: bg,
                    border: "2px solid #1A2E1A",
                    marginLeft: i > 0 ? "-8px" : "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#CBEF43",
                    fontWeight: 700,
                  }}
                >
                  {["A", "R", "S", "N"][i]}
                </div>
              ))}
            </div>
            <p
              style={{
                color: "rgba(245,245,239,0.4)",
                fontSize: "12px",
                margin: 0,
              }}
            >
              <span style={{ color: "rgba(203,239,67,0.8)", fontWeight: 600 }}>
                2,400+
              </span>{" "}
              people tracking smarter
            </p>
          </div>
        </div>

        {/* Footer tagline */}
        <p
          style={{
            color: "rgba(245,245,239,0.3)",
            fontSize: "13px",
            lineHeight: "1.6",
            position: "relative",
            zIndex: 1,
            marginTop: isMobile ? "28px" : "0",
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          Your money.{" "}
          <span style={{ color: "rgba(203,239,67,0.7)" }}>Clear picture.</span>{" "}
          Every day.
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "40px 24px 48px" : "48px 40px",
          position: "relative",
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translate(0,0)"
            : isMobile
              ? "translateY(30px)"
              : "translateX(40px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        {/* Bg orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(203,239,67,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(30,51,32,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "pulse 8s ease-in-out infinite 2s",
          }}
        />

        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Heading */}
          <div
            style={{
              marginBottom: "36px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "30px" : "36px",
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: "-1.2px",
                lineHeight: "1.1",
                margin: "0 0 12px",
              }}
            >
              Welcome to{" "}
              <span style={{ display: "inline-block", position: "relative" }}>
                Finora
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "4px",
                    backgroundColor: "#CBEF43",
                    borderRadius: "2px",
                    transform: mounted ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.7s ease 0.9s",
                    display: "block",
                  }}
                />
              </span>
            </h1>
            <p
              style={{
                color: "#6B7280",
                fontSize: "15px",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Sign in to manage your finances with clarity and confidence.
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
            }}
          >
            <button
              onClick={handleGoogleSignIn}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                padding: "16px 24px",
                borderRadius: "16px",
                border: hovering ? "2px solid #CBEF43" : "2px solid #E5E7EB",
                backgroundColor: hovering ? "#1A2E1A" : "#FFFFFF",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: "15px",
                color: hovering ? "#CBEF43" : "#1A1A1A",
                transition: "all 0.25s ease",
                boxShadow: hovering
                  ? "0 8px 32px rgba(203,239,67,0.2)"
                  : "0 2px 12px rgba(0,0,0,0.06)",
                transform:
                  hovering && !loading ? "translateY(-2px)" : "translateY(0)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(203,239,67,0.06) 50%, transparent 60%)",
                  transform: hovering
                    ? "translateX(100%)"
                    : "translateX(-100%)",
                  transition: "transform 0.5s ease",
                  pointerEvents: "none",
                }}
              />
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <GoogleIcon color={hovering ? "#CBEF43" : undefined} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              margin: "28px 0",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }}
            />
            <span
              style={{
                color: "#9CA3AF",
                fontSize: "12px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              free to use · no card needed
            </span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#E5E7EB" }}
            />
          </div>

          {/* App feature strip — replaces old bank/trust badges */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E9EBE4",
              borderRadius: "16px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
            }}
          >
            {[
              "Add transactions in seconds — income or expense",
              "Organize by custom categories you define",
              "Monthly summaries & net savings at a glance",
            ].map((text) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#CBEF43",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#4B5563",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Terms */}
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9CA3AF",
              marginTop: "24px",
              lineHeight: "1.6",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            By continuing, you agree to Finora's{" "}
            <a
              href="#"
              style={{
                color: "#1A2E1A",
                fontWeight: 600,
                textDecoration: "underline",
                textDecorationColor: "#CBEF43",
              }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{
                color: "#1A2E1A",
                fontWeight: 600,
                textDecoration: "underline",
                textDecorationColor: "#CBEF43",
              }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function GoogleIcon({ color }) {
  const c = color;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill={c || "#4285F4"}
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill={c || "#34A853"}
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill={c || "#FBBC05"}
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill={c || "#EA4335"}
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "2px solid rgba(203,239,67,0.3)",
        borderTopColor: "#CBEF43",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
