import { motion } from "motion/react";
import Logo from "../Logo";

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

const LeftPanel = () => {
  return (
    <motion.div
      className="w-full md:w-[45%] md:min-h-screen bg-[#154f27] dark:bg-[#0e3111] flex flex-col justify-between p-7 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-lime-400/[0.07] pointer-events-none" />
      <div className="absolute bottom-16 -left-16 w-52 h-52 rounded-full bg-lime-400/5 pointer-events-none" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(203,239,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(203,239,67,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <Logo textColor="cream" darkTextColor="" />

      {/* Feature highlights */}
      <motion.div
        className="relative z-10 mt-8 md:mt-0"
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.3 }}
      >
        <p className="text-lime-400/60 text-xs font-semibold uppercase tracking-widest mb-5">
          What you get
        </p>

        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="flex items-start gap-4 mb-5 last:mb-0"
            initial={{ opacity: 0, translateX: -16 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
              delay: 0.4 + i * 0.15,
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-lime-400/8 border border-lime-400/15 flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="text-cream font-bold text-sm m-0 mb-1">{f.title}</p>
              <p className="text-white/45 text-xs m-0 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer tagline */}
      <motion.p
        className="text-white/30 text-sm leading-relaxed relative z-10 mt-7 md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
      >
        Your money. <span className="text-lime-400/70">Clear picture.</span>{" "}
        Every day.
      </motion.p>
    </motion.div>
  );
};

export default LeftPanel;
