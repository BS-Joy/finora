import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Nov", income: 4000, expense: 2500 },
  { month: "Dec", income: 4500, expense: 2600 },
  { month: "Jan", income: 4700, expense: 3000 },
  { month: "Feb", income: 5000, expense: 3100 },
  { month: "Mar", income: 5200, expense: 3400 },
  { month: "Apr", income: 5500, expense: 3600 },
  { month: "May", income: 5500, expense: 7000 },
  { month: "Jun", income: 5500, expense: 8000 },
];

const IncomeExpenseChart = ({ isDark = false }) => {
  return (
    <div className="w-full bg-card border p-8 rounded-lg md:max-h-150">
      <div className="mb-8 dark:text-gray-300 text-gray-600 font-jakarta">
        <h3 className="text-xl font-semibold">Income vs Expenses</h3>
        <p className="text-gray-400 text-sm mt-0.5">Last 6 months</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart data={chartData}>
          {/* Gradients */}
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c49f" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00c49f" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Horizontal Grid ONLY */}
          <CartesianGrid
            // strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? "#374151" : "#e5e7eb"}
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tickFormatter={(value) => `৳${value}`}
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => [`৳${value}`, ""]}
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{
              color: isDark ? "#fff" : "#000",
            }}
          />

          {/* Income */}
          <Area
            type="monotone"
            dataKey="income"
            stroke="#00c49f"
            fill="url(#income)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, index } = props;

              const isLast = index === chartData.length - 1;

              if (!isLast) return null;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#00c49f"
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />

          {/* Expense */}
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ff4d4f"
            fill="url(#expense)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, index } = props;

              const isLast = index === chartData.length - 1;

              if (!isLast) return null;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#ff4d4f"
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-400"></span>
          <span className={isDark ? "text-gray-300" : "text-gray-600"}>
            Income
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className={isDark ? "text-gray-300" : "text-gray-600"}>
            Expenses
          </span>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
