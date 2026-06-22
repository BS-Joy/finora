import { useTransactionStore } from "@/store/TransactionStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import NewCategoryDialog from "./NewCategoryDialog";
import { Plus } from "lucide-react";

interface PropsTypes {
  value: string;
  onChange: (value: string) => void;
  transactionType: string;
  // showDialog: boolean;
  setShowDialog: (value: boolean) => void;
}

const TransactionCategorySelector = ({
  value,
  onChange,
  transactionType,
  setShowDialog,
}: PropsTypes) => {
  const { categories } = useTransactionStore();

  return (
    <div className="grid grid-cols-4 gap-2 max-h-30.5 overflow-y-auto no-scrollbar pb-3 pr-px">
      {categories?.length > 0 &&
        categories
          ?.filter((cat) => cat.type === transactionType)
          .map((cat) => {
            const active = cat.id === value;
            return (
              <Button
                type="button"
                key={cat?.id}
                value={value}
                onClick={() => onChange(cat.id)}
                className={cn(
                  "h-auto border-border bg-muted/50 hover:border-[#CBEF43]/50 hover:bg-muted flex flex-col gap-2 items-center justify-center rounded-2xl border-[1.5px] py-2.5 px-1 transition-all duration-150 cursor-pointer outline-none dark:bg-[#161616] dark:border-accent/30",
                  active &&
                    "bg-primary hover:bg-primary dark:bg-[#1A2E1A] dark:border-accent",
                )}
              >
                <span>{cat?.icon}</span>
                <span
                  className={cn(
                    "text-[10px] font-bold text-center leading-tight max-w-13 truncate text-primary dark:text-accent",
                    active && "text-accent",
                  )}
                >
                  {cat?.name}
                </span>
              </Button>
            );
          })}
      <Button
        type="button"
        onClick={() => setShowDialog(true)}
        className={cn(
          "h-auto border-border bg-muted/50 hover:border-[#CBEF43]/50 hover:bg-muted flex flex-col gap-2 items-center justify-center rounded-2xl border-[1.5px] py-2.5 px-1 transition-all duration-150 cursor-pointer outline-none dark:bg-[#161616] dark:border-accent/30",
        )}
      >
        <span className="font-semibold text-primary dark:text-white">
          <Plus />
        </span>
        <span
          className={cn(
            "text-[10px] font-bold text-center leading-tight max-w-13 truncate text-primary dark:text-accent",
          )}
        >
          Add category
        </span>
      </Button>
    </div>
  );
};

export default TransactionCategorySelector;
