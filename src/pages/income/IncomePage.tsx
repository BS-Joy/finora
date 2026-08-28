import IncomeSummary from "@/features/income/IncomeSummary";
import IncomeFilters from "@/features/income/IncomeFilters";
import IncomeTable from "@/features/income/IncomeTable";
import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";

const IncomePage = () => {
  const { userProfile } = useAuthStore();
  const currencySymbol =
    currencies.find((c) => c.code === userProfile?.currency)?.symbol || "$";
  return (
    <section className="pre-sm:px-6 px-3 pre-sm:pb-4 relative bottom-22 lg:bottom-0 mt-22 lg:mt-0 lg:mb-4">
      <div className="mx-1 lg:ml-69 font-jakarta space-y-6">
        {/* <div>
          <h1 className="text-2xl font-bold text-foreground">Income Page</h1>
          <p className="text-muted-foreground text-sm">
            Filterable income list with summary stats
          </p>
        </div> */}

        <IncomeSummary />

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <IncomeFilters />
          <IncomeTable currencySymbol={currencySymbol} />
        </div>
      </div>
    </section>
  );
};

export default IncomePage;
