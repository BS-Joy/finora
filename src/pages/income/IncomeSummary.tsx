import { ArrowUpRight, ListOrdered, Calculator, Calendar } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { Card, CardContent } from "@/components/ui/card";

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
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Last Month",
      value: `${userProfile?.currency || "৳"} ${summary.lastMonth.toLocaleString()}`,
      icon: ArrowUpRight,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Transactions",
      value: summary.transactions.toString(),
      icon: ListOrdered,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Avg. per Transaction",
      value: `${userProfile?.currency || "৳"} ${summary.avgPerTransaction.toLocaleString()}`,
      icon: Calculator,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-none bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IncomeSummary;
