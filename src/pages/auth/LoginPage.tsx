import LeftPanel from "@/components/auth/LeftPanel";
import RightPanel from "@/components/auth/RightPanel";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";
import { Navigate } from "react-router";

// Finora Login Page — Google Sign-In Only
// Colors from FinFlow UI:
//   Primary Lime:   #CBEF43
//   Dark Green:     #1A2E1A
//   Background:     #F5F5EF
//   Text dark:      #1A1A1A

export default function LoginPage() {
  const { user, getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-cream font-jakarta flex flex-col md:flex-row overflow-hidden relative">
      {/* ── Left Panel ── */}
      <LeftPanel />

      {/* ── Right Panel ── */}
      <RightPanel />
    </div>
  );
}
