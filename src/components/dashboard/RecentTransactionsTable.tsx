import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const RecentTransactionsTable = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: async () => {
      const res = await supabase
        .from("transactions")
        .select()
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 ? (
          data?.map((t, index) => (
            <TableRow key={index}>
              <TableCell className="flex items-center gap-2">
                <span className="bg-green-600/20 dark:bg-green-600/40 p-2 rounded flex items-center justify-center shrink">
                  💼{" "}
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
                <Badge className="bg-green-600/10 dark:bg-green-600/20 text-green-600">
                  Salary
                </Badge>
              </TableCell>
              <TableCell>15 April, 2026</TableCell>
              <TableCell>
                <Badge className="bg-green-600/10 dark:bg-green-600/20 text-green-600">
                  Income
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-green-500">
                + $250.00
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div>No transaction yet</div>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentTransactionsTable;
