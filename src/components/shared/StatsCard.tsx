import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  bgColor?: string;
  iconBg?: string;
  iconColor?: string;
  textColor?: string;
  delay: number;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconBg,
  textColor,
  iconColor,
  delay,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: delay }}
      className={`rounded-3xl p-5 pb-7 ${bgColor || "bg-lime"} w-full`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className={`text-xs font-semibold ${textColor || "text-forest/70"}`}>
          {title}
        </p>
        <div
          className={`w-7 h-7 rounded-xl ${iconBg || "bg-forest/10"} flex items-center justify-center`}
        >
          <Icon size={16} className={iconColor || "text-forest"} />
        </div>
      </div>
      <p className={`text-3xl font-extrabold ${textColor || "text-forest"}`}>
        {value}
      </p>
      {/* <p className="text-xs text-forest/60 mt-1">+12.4% vs last month</p> */}
    </motion.div>
  );
};

export default StatsCard;
