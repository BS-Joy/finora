import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { cn, formatDate } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import RecentTransactionsCard from "./RecentTransactionsCard";
import type { TransactionWithCategory } from "@/types";

const RecentTransactionsTable = ({
  currencySymbol,
}: {
  currencySymbol: string;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, error, isPending } = useQuery<TransactionWithCategory[]>({
    queryKey: ["recentTransactions"],
    queryFn: async () => {
      const res = await supabase
        .from("transactions")
        .select("*, category: category_id (*)")
        .limit(5)
        .order("created_at", { ascending: false });

      if (res?.error) {
        console.log(res.error);
        throw new Error(res.error.message);
      }

      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">
        Something went wrong. Please refresh the page or try again later.
      </p>
    );
  }

  if (isMobile) {
    return (
      <div className="mt-4">
        {data?.length > 0 ? (
          data?.map((t) => (
            <RecentTransactionsCard
              transaction={t}
              currencySymbol={currencySymbol}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No recent transactions.
          </p>
        )}
      </div>
    );
  }

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      {data?.length > 0 && (
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
      )}

      <TableBody>
        {data?.length > 0 ? (
          data?.map((t, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-2">
                <span
                  className="p-2 rounded flex items-center justify-center shrink"
                  style={{ backgroundColor: t.category.color }}
                >
                  {t.category.icon}
                </span>
                <div className="">
                  <h6 className="font-bold dark:text-cream">{t.title}</h6>

                  <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
                    {t?.note ? (
                      t.note
                    ) : (
                      <span className="text-gray-500/50">No notes</span>
                    )}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  style={{
                    color: t.category.color,
                    backgroundColor: `${t.category.color}30`,
                  }}
                >
                  {t?.category?.name}
                </Badge>
              </TableCell>
              <TableCell>
                {formatDate(t.created_at ?? "Date Unknown")}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "",
                    t.type === "expense"
                      ? "text-red-500 bg-red-600/10 dark:bg-red-600/20"
                      : "text-green-500 bg-green-600/10 dark:bg-green-600/20",
                  )}
                >
                  {t.type === "expense" ? "Expense" : "Income"}
                </Badge>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-bold",
                  t.type === "expense" ? "text-red-500" : "text-green-500",
                )}
              >
                {t.type === "expense" ? "-" : "+"} {currencySymbol}
                {t.amount}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentTransactionsTable;
