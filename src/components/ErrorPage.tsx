import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { HandCoins } from "lucide-react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { cn } from "@/lib/utils";

/**
 * ErrorPage — Finora Global Error Component
 *
 * A no-props error component that automatically extracts error information
 * from the route error using useRouteError(). Displays appropriate error code,
 * title, description, and icon based on the error type.
 *
 * Usage (in router):
 *   {
 *     path: "/",
 *     element: <App />,
 *     errorElement: <ErrorPage />,
 *   }
 */

const ERROR_META = {
  404: {
    label: "Not Found",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="#CBEF43"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        <path
          d="M22 32h20M32 22v20"
          stroke="#CBEF43"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="rotate-45 origin-center"
          style={{ transform: "rotate(45deg)", transformOrigin: "32px 32px" }}
        />
        <circle
          cx="32"
          cy="32"
          r="6"
          fill="rgba(203,239,67,0.15)"
          stroke="#CBEF43"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  500: {
    label: "Server Error",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="16"
          width="48"
          height="32"
          rx="6"
          stroke="#CBEF43"
          strokeWidth="2.5"
          fill="rgba(203,239,67,0.06)"
        />
        <path
          d="M20 28h8M20 36h4M36 28l8 8M44 28l-8 8"
          stroke="#CBEF43"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle
          cx="52"
          cy="14"
          r="6"
          fill="#1A2E1A"
          stroke="#CBEF43"
          strokeWidth="2"
        />
        <path
          d="M52 11v4M52 16.5v.5"
          stroke="#CBEF43"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  403: {
    label: "Forbidden",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="16"
          y="28"
          width="32"
          height="22"
          rx="5"
          stroke="#CBEF43"
          strokeWidth="2.5"
          fill="rgba(203,239,67,0.06)"
        />
        <path
          d="M22 28v-8a10 10 0 0 1 20 0v8"
          stroke="#CBEF43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="39" r="3" fill="#CBEF43" />
        <path
          d="M32 42v4"
          stroke="#CBEF43"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  unknown: {
    label: "Error",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 8L56 52H8L32 8z"
          stroke="#CBEF43"
          strokeWidth="2.5"
          fill="rgba(203,239,67,0.06)"
          strokeLinejoin="round"
        />
        <path
          d="M32 28v10M32 42v2"
          stroke="#CBEF43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

export default function ErrorPage() {
  const error = useRouteError();
  const [mounted, setMounted] = useState(false);

  // Extract error information from route error
  let errorCode: number | string = 404;
  let errorTitle = "Page Not Found";
  let errorDescription =
    "The page you're looking for doesn't exist or has been moved.";

  if (isRouteErrorResponse(error)) {
    errorCode = error.status ?? 404;
    errorTitle = error.statusText ?? "Error";
    errorDescription =
      error.data?.message ?? "An error occurred while processing your request.";
    console.log("Route Error: ", error);
  } else if (error instanceof Error) {
    errorCode = "unknown";
    errorTitle = error.name || "Unknown Error";
    errorDescription = error.message ?? "Something went wrong on our end.";
    console.log("Error: ", error.message);
  }

  const meta =
    ERROR_META[errorCode as keyof typeof ERROR_META] ?? ERROR_META.unknown;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F5F5EF] font-sans px-4 py-12">
      {/* ── Background grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,46,26,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,46,26,0.045) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="pointer-events-none absolute top-[8%] right-[6%] w-72 h-72 rounded-full bg-[#CBEF43]/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-[10%] left-[4%] w-52 h-52 rounded-full bg-[#1A2E1A]/6 blur-2xl animate-pulse [animation-delay:2s]" />

      {/* ── Large ghost error code ── */}
      <span
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[clamp(140px,28vw,280px)] font-black tracking-tighter text-[#1A2E1A]/4 leading-none"
        aria-hidden="true"
      >
        {errorCode}
      </span>

      {/* ── Card ── */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md",
          "bg-white border border-[#E5E7EB] rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.07)]",
          "px-8 py-10 sm:px-10 sm:py-12",
          "flex flex-col items-center text-center gap-6",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Icon container */}
        <div
          className={cn(
            "flex items-center justify-center w-24 h-24 rounded-2xl",
            "bg-[#1A2E1A] border border-[#CBEF43]/20",
            "shadow-[0_0_32px_rgba(203,239,67,0.15)]",
            "transition-all duration-700 delay-150",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          {meta.icon}
        </div>

        {/* Badge */}
        <div
          className={cn(
            "transition-all duration-700 delay-200",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          <Badge
            className="bg-[#CBEF43]/15 text-[#1A2E1A] border border-[#CBEF43]/40 font-semibold text-xs tracking-widest uppercase px-3 py-1 rounded-full hover:bg-[#CBEF43]/20"
            variant="outline"
          >
            {errorCode} &nbsp;·&nbsp; {meta.label}
          </Badge>
        </div>

        {/* Title */}
        <h1
          className={cn(
            "text-[28px] sm:text-[32px] font-extrabold text-[#1A1A1A] leading-tight tracking-tight -mt-1",
            "transition-all duration-700 delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          {errorTitle}
        </h1>

        {/* Description */}
        <p
          className={cn(
            "text-[#6B7280] text-[15px] leading-relaxed max-w-sm -mt-2",
            "transition-all duration-700 delay-[380ms]",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          {errorDescription}
        </p>

        {/* Divider */}
        <div
          className={cn(
            "w-full h-px bg-[#E9EBE4]",
            "transition-all duration-700 delay-[430ms]",
            mounted ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Actions */}
        <div
          className={cn(
            "flex justify-center w-full",
            "transition-all duration-700 delay-500",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          )}
        >
          {/* Primary — Go Home */}
          <Link
            to="/"
            className="flex justify-center items-center px-8 h-12 rounded-2xl bg-[#1A2E1A] hover:bg-[#243d24] text-[#CBEF43] font-semibold text-[15px] border-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(203,239,67,0.18)] gap-2 group"
          >
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                <path d="M3 12l9-9 9 9" />
                <path d="M9 21V12h6v9" />
                <path d="M3 12h18" style={{ display: "none" }} />
                <path d="M3 12l2-2" style={{ display: "none" }} />
              </svg>
            </span>
            <span>Go to Home</span>
          </Link>
        </div>

        {/* Footer hint */}
        <p
          className={cn(
            "text-[11px] text-[#9CA3AF] leading-relaxed -mt-1",
            "transition-all duration-700 delay-[580ms]",
            mounted ? "opacity-100" : "opacity-0",
          )}
        >
          If this keeps happening, please{" "}
          <a
            href="mailto:support@finora.app"
            className="text-[#1A2E1A] font-semibold underline decoration-[#CBEF43] underline-offset-2 hover:text-[#CBEF43] transition-colors"
          >
            contact support
          </a>
          .
        </p>
      </div>

      {/* ── Finora wordmark (bottom-center) ── */}
      <div
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2",
          "transition-all duration-700 delay-700",
          mounted ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-6 h-6 rounded-md bg-[#1A2E1A] flex items-center justify-center">
          <span className="text-[#CBEF43] font-black text-[9px] tracking-tight">
            <HandCoins size={9} />
          </span>
        </div>
        <span className="text-[#1A2E1A]/40 font-semibold text-xs tracking-tight">
          Finora
        </span>
      </div>
    </div>
  );
}
