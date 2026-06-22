import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Spinner from "../../../components/Spinner";
import type { TransactionWithCategory } from "@/types";

// const RADIAN = Math.PI / 180;

export default function SpendingChart() {
  const {
    data: chartData,
    isPending,
    error,
  } = useQuery<
    { name: string; value: number; color: string; amount: number }[]
  >({
    queryKey: ["spendingByCategory"],
    queryFn: async () => {
      const res = await supabase
        .from("transactions")
        .select("*, category: category_id (*)")
        .eq("type", "expense");

      if (res?.error) {
        console.log(res.error);
        throw new Error(res.error.message);
      }

      const transactions = res.data as TransactionWithCategory[];
      const categoryMap: {
        [key: string]: { amount: number; color: string };
      } = {};

      transactions.forEach((t) => {
        const categoryName = t.category.name;
        if (!categoryMap[categoryName]) {
          categoryMap[categoryName] = { amount: 0, color: t.category.color };
        }
        categoryMap[categoryName].amount += t.amount;
      });

      const totalExpense = Object.values(categoryMap).reduce(
        (sum, cat) => sum + cat.amount,
        0,
      );

      return Object.entries(categoryMap)
        .map(([name, data]) => ({
          name,
          amount: data.amount,
          value: Math.round((data.amount / totalExpense) * 100),
          color: data.color,
        }))
        .sort((a, b) => b.amount - a.amount);
    },
  });

  if (isPending) {
    return (
      <div className="rounded-lg p-8 bg-card w-full border flex justify-center items-center">
        <Spinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg p-8 bg-card w-full border flex justify-center items-center">
        <p className="text-red-500">Failed to load chart data</p>
      </div>
    );
  }

  const totalExpense =
    chartData?.reduce((sum, cat) => sum + cat.amount, 0) || 0;
  const formattedTotal = (totalExpense / 1000).toFixed(1);

  return (
    <div className="rounded-lg p-8 bg-card w-full border">
      {/* Header */}
      <div className="mb-4 dark:text-gray-300 text-gray-600 font-jakarta">
        <h2 className="text-xl font-semibold tracking-tight">
          Spending by Category
        </h2>
        <p className="text-gray-400 text-sm mt-0.5">This month</p>
      </div>

      {/* Chart + Legend Row */}
      <div className="flex items-center justify-center gap-4 md:gap-0 sm:justify-around md:mt-10">
        {/* Donut Chart */}
        <div className="relative shrink-0 w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 500, height: 300 }}
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={"52%"}
                outerRadius={"80%"}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
              >
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-bold text-lg leading-tight">
              ৳{formattedTotal}k
            </span>
            <span className="text-xs mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {chartData?.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full shrink-0"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: item.color,
                    display: "inline-block",
                  }}
                />
                <span className=" text-sm">{item.name}</span>
              </div>
              <span className=" text-sm font-semibold ml-4">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
