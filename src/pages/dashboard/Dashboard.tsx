import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import SpendingByCategoryChart from "@/components/charts/SpendingByCategoryChart";
import MobileStatCard from "@/components/dashboard/MobileStatCard";
import RecentTransactionsTable from "@/components/dashboard/RecentTransactionsTable";
import StatsCard from "@/components/shared/StatsCard";
import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";
import { DollarSign, Save, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, userProfile, createUserProfile } = useAuthStore();

  useEffect(() => {
    const createProfileIfNotExists = async () => {
      await createUserProfile();
    };

    if (user) {
      createProfileIfNotExists();
    }
  }, [user, createUserProfile]);

  const currencySymbol =
    currencies.find((c) => c.code === userProfile?.currency)?.symbol || "$";
  return (
    <section className="px-6 py-4 relative bottom-22 lg:bottom-0 mt-20 lg:mt-0 lg:mb-4">
      <div className="mx-1 lg:ml-69 font-jakarta">
        <div className="hidden md:flex flex-col md:flex-row gap-6">
          <StatsCard
            title="Current Balance"
            value={`${currencySymbol}2,635`}
            icon={DollarSign}
            bgColor="bg-primary dark:bg-cream"
            textColor="text-cream dark:text-primary"
            iconBg="bg-cream/40 dark:bg-primary/40"
            iconColor="text-primary dark:text-cream"
            delay={0.2}
          />
          <StatsCard
            title="Total Income"
            value={`${currencySymbol}1,200`}
            icon={TrendingUp}
            textColor="text-primary/80"
            bgColor="bg-lime"
            iconBg="bg-primary/40"
            iconColor="text-lime"
            delay={0.4}
          />
          <StatsCard
            title="Total Expenses"
            value={`${currencySymbol}1,435`}
            icon={TrendingDown}
            textColor="destructive"
            bgColor="bg-red-400/80 dark:bg-red-400"
            iconBg="bg-cream/40"
            iconColor="text-red-700/80"
            delay={0.6}
          />
          <StatsCard
            title="Savings"
            value="12%"
            icon={Save}
            delay={0.8}
            bgColor="bg-blue-400/80"
          />
        </div>

        {/* mobile stat card */}
        <MobileStatCard />

        {/* income vs expenses chart */}
        <div className="hidden pre-sm:flex flex-col lg:flex-row mt-6 gap-6">
          <IncomeExpenseChart />
          <SpendingByCategoryChart />
        </div>

        {/* recent transactions table */}
        <div className="mt-6 bg-card border rounded-lg p-8">
          <h2 className="text-xl font-semibold font-jakarta mb-4 dark:text-gray-300 text-gray-600">
            Recent Transactions
          </h2>
          <RecentTransactionsTable />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
