import type { TransactionWithCategory } from "@/types";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IncomeCardProps {
  transaction: TransactionWithCategory;
  currencySymbol: string;
}

const IncomeCard = ({ transaction, currencySymbol }: IncomeCardProps) => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-4 last:mb-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className="p-2 rounded flex items-center justify-center shrink"
            style={{ backgroundColor: transaction.category.color }}
          >
            {transaction.category.icon}
          </span>
          <div className="flex flex-col justify-center">
            <h6 className="font-bold dark:text-cream">{transaction.title}</h6>

            <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
              {transaction.note || "No notes"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 items-end">
            <span className="font-bold text-green-500">
              + {currencySymbol}
              {transaction.amount}
            </span>
            <span className="text-[12px]">
              {formatDate(transaction?.created_at ?? "Date Unknown")}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-amber-500 focus:text-amber-600 focus:bg-amber-500/10">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
