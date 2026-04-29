import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Food", value: 34, color: "#FF6B6B" },
  { name: "Rent", value: 23, color: "#A78BFA" },
  { name: "Transport", value: 15, color: "#FBBF24" },
  { name: "Others", value: 28, color: "#2DD4BF" },
];

// const RADIAN = Math.PI / 180;

export default function SpendingChart() {
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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
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
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-bold text-lg leading-tight">৳42.5k</span>
            <span className="text-xs mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {data.map((item) => (
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
