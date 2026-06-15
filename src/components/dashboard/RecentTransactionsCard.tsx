import type { TransactionWithCategory } from "@/types";
import { Badge } from "../ui/badge";
import { cn, formatDate } from "@/lib/utils";

interface RecentTransactionsCardProps {
  transaction: TransactionWithCategory;
  currencySymbol: string;
}

const RecentTransactionsCard = ({
  transaction,
  currencySymbol,
}: RecentTransactionsCardProps) => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-4 last:mb-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-green-600/20 dark:bg-green-600/40 p-1 rounded flex items-center justify-center shrink">
            {transaction.category.icon}
          </span>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h6 className="font-bold dark:text-cream">{transaction.title}</h6>
              <Badge className="bg-green-600/10 dark:bg-green-600/20 text-green-600">
                {transaction?.category?.name}
              </Badge>
            </div>
            <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
              {transaction.note || "No notes"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-end">
          <span
            className={cn(
              "font-bold",
              transaction.type === "expense"
                ? "text-red-500"
                : "text-green-500",
            )}
          >
            {transaction.type === "expense" ? "-" : "+"} {currencySymbol}
            {transaction.amount}
          </span>
          <span className="text-[12px]">
            {formatDate(transaction?.created_at ?? "Date Unknown")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
