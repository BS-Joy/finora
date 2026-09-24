import type { TransactionWithCategory } from "@/types";
import useCurrencySymbol from "@/hooks/useCurrencySymbol";
import { MessageSquareX } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const TransactionCard = ({
  transaction,
}: {
  transaction: TransactionWithCategory;
}) => {
  const currencySymbol = useCurrencySymbol();
  return (
    <div className="bg-card border rounded-sm p-3 py-2 mb-4 last:mb-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className="p-1 rounded flex items-center justify-center shrink"
            style={{ backgroundColor: transaction.category.color }}
          >
            {transaction.category.icon}
          </span>
          <div className="flex flex-col justify-center">
            <h6 className="font-bold text-sm dark:text-cream">
              {transaction.title}
            </h6>

            <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
              {transaction.note || <MessageSquareX size={10} />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
};

export default TransactionCard;
