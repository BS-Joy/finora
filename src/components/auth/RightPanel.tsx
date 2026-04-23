import { motion } from "motion/react";
import { useState } from "react";
import Spinner from "../Spinner";
import { supabase } from "@/lib/supabase";

const RightPanel = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative"
      initial={{ opacity: 0, translateX: 40 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
    >
      {/* Bg orbs */}
      <div
        className="absolute top-[10%] right-[8%] w-80 h-80 rounded-full pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(203,239,67,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[15%] left-[5%] w-44 h-44 rounded-full pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(30,51,32,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md">
        {/* Heading */}
        <motion.div
          className="mb-9"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-black text-forest leading-tight mb-3 m-0 tracking-[-1.2px]">
            Welcome to{" "}
            <span className="inline-block relative">
              Finora
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-lime-400 rounded block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }} // same as transformOrigin: "left"
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
              />
            </span>
          </h1>
          <p className="text-gray-500 text-sm m-0 leading-relaxed">
            Sign in to manage your finances with clarity and confidence.
          </p>
        </motion.div>

        {/* Google Sign-In Button */}
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3.5 px-6 py-4 rounded-2xl border-2 transition-all relative overflow-hidden duration-300 ${loading ? "cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(203,239,67,0.2)] transition-all duration-300"} bg-white text-forest border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-forest hover:text-lime hover:border-lime`}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="absolute inset-0 cursor-none"
              initial={{ translateX: "-100%" }}
              animate={{ translateX: "100%" }}
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(203,239,67,0.06) 50%, transparent 60%)",
              }}
            />
            {loading ? (
              <Spinner />
            ) : (
              <>
                <GoogleIcon />
                <span className="font-semibold text-base">
                  Continue with Google
                </span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 my-7"
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs font-medium whitespace-nowrap">
            free to use · no card needed
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        {/* App feature strip — replaces old bank/trust badges */}
        <motion.div
          className="rounded-2xl border border-border bg-white p-5 flex flex-col gap-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
        >
          {[
            "Add transactions in seconds — income or expense",
            "Organize by custom categories you define",
            "Monthly summaries & net savings at a glance",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <p className="text-xs text-gray-700 m-0 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Terms */}
        <motion.p
          className="text-center text-xs text-gray-400 mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
        >
          By continuing, you agree to Finora's{" "}
          <a
            href="#"
            className="text-forest font-semibold underline decoration-accent"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-forest font-semibold underline decoration-accent"
          >
            Privacy Policy
          </a>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default RightPanel;

function GoogleIcon() {
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
        fill={"#4285F4"}
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill={"#34A853"}
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill={"#FBBC05"}
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill={"#EA4335"}
      />
    </svg>
  );
}
