import { ArrowUpRight, ListOrdered, Calculator, Calendar } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import StatsCard from "@/components/StatsCard";

const IncomeSummary = () => {
  const { userProfile } = useAuthStore();

  // Mock data for design purposes as per instructions
  const summary = {
    thisMonth: 85000,
    lastMonth: 78500,
    transactions: 6,
    avgPerTransaction: 14166,
  };

  const cards = [
    {
      title: "This Month",
      value: `${userProfile?.currency || "৳"} ${summary.thisMonth.toLocaleString()}`,
      icon: Calendar,
      bgColor: "bg-emerald-500/80",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      delay: 0.2,
    },
    {
      title: "Last Month",
      value: `${userProfile?.currency || "৳"} ${summary.lastMonth.toLocaleString()}`,
      icon: ArrowUpRight,
      bgColor: "bg-blue-500/80",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      delay: 0.4,
    },
    {
      title: "Transactions",
      value: summary.transactions.toString(),
      icon: ListOrdered,
      bgColor: "bg-amber-500/80",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      delay: 0.6,
    },
    {
      title: "Avg. per Transaction",
      value: `${userProfile?.currency || "৳"} ${summary.avgPerTransaction.toLocaleString()}`,
      icon: Calculator,
      bgColor: "bg-purple-500/80",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      delay: 0.8,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          bgColor={card.bgColor}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
          delay={card.delay}
        />
      ))}
    </div>
  );
};

export default IncomeSummary;
