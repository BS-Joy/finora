import IncomeSummary from "./IncomeSummary";
import IncomeFilters from "./IncomeFilters";
import IncomeTable from "./IncomeTable";

const IncomePage = () => {
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
          <IncomeTable />

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing 1-4 of 6 results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-muted disabled:opacity-50">
                ← Prev
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-muted">
                2
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-muted">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomePage;
