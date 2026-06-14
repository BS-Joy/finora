import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const IncomeTable = () => {
  // Mock data to match the image provided
  const data = [
    {
      title: "Monthly Salary",
      note: "BRAC Bank",
      category: "Salary",
      icon: "💼",
      date: "Apr 1, 2025",
      amount: 75000,
    },
    {
      title: "Freelance Project",
      note: "Upwork - Web App",
      category: "Freelance",
      icon: "💻",
      date: "Apr 8, 2025",
      amount: 10000,
    },
    {
      title: "Eid Gift",
      note: "From family",
      category: "Gift",
      icon: "🎁",
      date: "Apr 10, 2025",
      amount: 5000,
    },
    {
      title: "Dividend",
      note: "Stock portfolio",
      category: "Investment",
      icon: "📈",
      date: "Apr 15, 2025",
      amount: 3200,
    },
  ];

  return (
    <div className="rounded-md border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">DESCRIPTION</TableHead>
            <TableHead className="font-semibold text-center">
              CATEGORY
            </TableHead>
            <TableHead className="font-semibold">DATE</TableHead>
            <TableHead className="font-semibold">AMOUNT</TableHead>
            <TableHead className="font-semibold text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-muted/30">
              <TableCell className="flex items-center gap-3 py-4">
                <span className="bg-emerald-500/10 p-2.5 rounded-lg flex items-center justify-center text-xl">
                  {item.icon}
                </span>
                <div>
                  <h6 className="font-bold text-foreground leading-none mb-1">
                    {item.title}
                  </h6>
                  <p className="text-xs text-muted-foreground font-medium">
                    {item.note}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none px-3 py-1 font-medium">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium text-muted-foreground">
                {item.date}
              </TableCell>
              <TableCell className="font-bold text-emerald-500">
                +৳{item.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomeTable;
