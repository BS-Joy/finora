import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";
import { motion } from "framer-motion";

const MobileStatCard = ({
  balance = 42500,
  income = 85000,
  expenses = 42500,
}: {
  balance?: number;
  income?: number;
  expenses?: number;
}) => {
  const { userProfile } = useAuthStore();
  const currencySymbol =
    currencies.find((c) => c.code === userProfile?.currency)?.symbol || "$";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full rounded-[18px] p-5 flex md:hidden flex-col gap-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.28 0.07 145) 0%, oklch(0.42 0.13 150) 55%, oklch(0.58 0.17 158) 100%)",
      }}
    >
      {/* top section */}
      <div className="flex flex-col gap-1">
        <p
          className="font-jakarta text-[11px] font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.82 0.04 155)" }}
        >
          Current Balance
        </p>
        <p className="font-jakarta text-[36px] font-extrabold tracking-tight leading-[1.1] text-cream">
          {currencySymbol} {balance.toLocaleString()}
        </p>
      </div>

      {/* inset panel */}
      <div
        className="rounded-xl grid"
        style={{
          background: "oklch(0.18 0.04 150 / 0.45)",
          gridTemplateColumns: "1fr 1px 1fr",
        }}
      >
        {/* income */}
        <div className="flex flex-col gap-1 px-3.5 py-3">
          <span
            className="font-jakarta text-[11px] font-medium"
            style={{ color: "oklch(0.78 0.05 155)" }}
          >
            Income
          </span>
          <span className="font-jakarta text-[17px] font-bold tracking-tight text-cream">
            {currencySymbol} {income.toLocaleString()}
          </span>
        </div>

        {/* divider */}
        <div style={{ background: "oklch(1 0 0 / 0.12)" }} />

        {/* expenses */}
        <div className="flex flex-col gap-1 px-3.5 py-3">
          <span
            className="font-jakarta text-[11px] font-medium"
            style={{ color: "oklch(0.78 0.05 155)" }}
          >
            Expenses
          </span>
          <span className="font-jakarta text-[17px] font-bold tracking-tight text-cream">
            {currencySymbol} {expenses.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileStatCard;
