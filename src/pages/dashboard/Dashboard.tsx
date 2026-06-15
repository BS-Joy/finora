import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import SpendingByCategoryChart from "@/components/charts/SpendingByCategoryChart";
import MobileStatCard from "@/components/dashboard/MobileStatCard";
import RecentTransactionsTable from "@/components/dashboard/RecentTransactionsTable";
import WalletSelector from "@/components/layout/WalletSelector";
import ProfileCreationForm from "@/components/profile/ProfileCreationForm";
import StatsCard from "@/components/shared/StatsCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";
import { DollarSign, TrendingDown, TrendingUp, Vault } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";

const Dashboard = () => {
  const profileExist: boolean = useLoaderData();
  const [showDialog, setShowDialog] = useState<boolean>(!profileExist);
  const { userProfile, user } = useAuthStore();
  const currentWallet = useAuthStore((state) => state.currentWallet);

  const isMobile = useMediaQuery("(min-width: 500px)");
  const savingsPercentage = currentWallet
    ? ((currentWallet.total_income - currentWallet.total_expense) /
        currentWallet.total_income) *
      100
    : 0;

  const currencySymbol =
    currencies.find((c) => c.code === userProfile?.currency)?.symbol || "$";
  return (
    <section className="pre-sm:px-6 px-3 pre-sm:pb-4 relative bottom-22 lg:bottom-0 mt-22 lg:mt-0 lg:mb-4">
      <div className="mx-1 lg:ml-69 font-jakarta">
        {/* stat cards */}
        <div className="hidden md:flex flex-col md:flex-row gap-6">
          <StatsCard
            title="Current Balance"
            value={`${currencySymbol} ${currentWallet?.current_balance}`}
            icon={DollarSign}
            bgColor="bg-primary dark:bg-cream"
            textColor="text-cream dark:text-primary"
            iconBg="bg-cream/40 dark:bg-primary/40"
            iconColor="text-primary dark:text-cream"
            delay={0.2}
          />
          <StatsCard
            title="Total Income"
            value={`${currencySymbol} ${currentWallet?.total_income}`}
            icon={TrendingUp}
            textColor="text-primary/80"
            bgColor="bg-lime"
            iconBg="bg-primary/40"
            iconColor="text-lime"
            delay={0.4}
          />
          <StatsCard
            title="Total Expenses"
            value={`${currencySymbol} ${currentWallet?.total_expense}`}
            icon={TrendingDown}
            textColor="destructive"
            bgColor="bg-red-400/80 dark:bg-red-400"
            iconBg="bg-cream/40"
            iconColor="text-red-700/80"
            delay={0.6}
          />
          <StatsCard
            title="Savings"
            value={`${savingsPercentage.toFixed(2)}%`}
            icon={Vault}
            delay={0.8}
            bgColor="bg-blue-400/80"
          />
        </div>

        {/* mobile header */}
        <div className="flex md:hidden justify-between py-4">
          <div>
            <h1 className="font-normal text-sm">Welcome</h1>
            <p className="font-semibold text-lg">{user?.user_metadata?.name}</p>
          </div>
          <WalletSelector customClass="py-0" />
        </div>

        {/* mobile stat card */}
        <MobileStatCard
          balance={currentWallet?.current_balance ?? 0}
          income={currentWallet?.total_income ?? 0}
          expense={currentWallet?.total_expense ?? 0}
        />

        {/* income vs expenses chart */}
        {isMobile && (
          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <IncomeExpenseChart />
            <SpendingByCategoryChart />
          </div>
        )}

        {/* recent transactions table */}
        <div className="mt-6 md:bg-card md:border rounded-lg md:p-8">
          <h2 className="text-xl font-semibold font-jakarta mb-4 dark:text-gray-300 text-gray-600">
            Recent Transactions
          </h2>
          <RecentTransactionsTable currencySymbol={currencySymbol} />
        </div>
      </div>
      <Dialog open={showDialog}>
        <DialogContent showCloseButton={false} overlayBG="bg-primary">
          <DialogTitle className="hidden">Create Profile</DialogTitle>
          <ProfileCreationForm setShowDialog={setShowDialog} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Dashboard;
