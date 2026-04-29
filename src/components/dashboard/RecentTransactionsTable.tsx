import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

const RecentTransactionsTable = () => {
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
        <TableRow>
          <TableCell className="flex items-center gap-2">
            <span className="bg-green-600/20 dark:bg-green-600/40 p-2 rounded flex items-center justify-center shrink">
              💼{" "}
            </span>
            <div className="">
              <h6 className="font-bold dark:text-cream">Monthly Salary</h6>
              <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
                March 2026
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

        <TableRow>
          <TableCell className="flex items-center gap-2">
            <span className="bg-green-600/20 dark:bg-green-600/40 p-2 rounded flex items-center justify-center shrink">
              💼{" "}
            </span>
            <div className="">
              <h6 className="font-bold dark:text-cream">Monthly Salary</h6>
              <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
                March 2026
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

        <TableRow>
          <TableCell className="flex items-center gap-2">
            <span className="bg-green-600/20 dark:bg-green-600/40 p-2 rounded flex items-center justify-center shrink">
              💼{" "}
            </span>
            <div className="">
              <h6 className="font-bold dark:text-cream">Monthly Salary</h6>
              <p className="text-[12px] text-muted-foreground font-jakarta font-medium">
                March 2026
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

        {/* <TableRow>
          <TableCell>Salary</TableCell>
          <TableCell>
            <Badge variant={"destructive"}>Rent</Badge>
          </TableCell>
          <TableCell>15 April, 2026</TableCell>
          <TableCell>
            <Badge variant="destructive">Income</Badge>
          </TableCell>
          <TableCell className="text-right font-bold text-red-500">
            - $250.00
          </TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default RecentTransactionsTable;
