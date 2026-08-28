import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Spinner from "@/components/Spinner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import IncomeCard from "./IncomeCard";
import type { TransactionWithCategory } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useState, useMemo, useEffect } from "react";

const IncomeTable = ({ currencySymbol }: { currencySymbol: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentPage, setCurrentPage] = useState(1);

  // Items per page: 5 for desktop, 4 for mobile
  const itemsPerPage = isMobile ? 4 : 5;

  const { data, error, isPending } = useQuery<TransactionWithCategory[]>({
    queryKey: ["incomeTransactions"],
    queryFn: async () => {
      const res = await supabase
        .from("transactions")
        .select("*, category: category_id (*)")
        .eq("type", "income")
        .order("created_at", { ascending: false });

      if (res?.error) {
        console.log(res.error);
        throw new Error(res.error.message);
      }

      return res.data;
    },
  });

  // Pagination logic
  const totalItems = data?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showPagination = totalItems > itemsPerPage;

  // Reset to page 1 if current page exceeds total pages (when data changes)
  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

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
        {paginatedData.length > 0 ? (
          <>
            {paginatedData.map((t) => (
              <IncomeCard
                key={t.id}
                transaction={t}
                currencySymbol={currencySymbol}
              />
            ))}
            {showPagination && (
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-9"
                    >
                      {page}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            No income transactions.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
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
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="flex items-center gap-3 py-3">
                  <span
                    className="p-2 rounded flex items-center justify-center text-xl shrink"
                    style={{ backgroundColor: item.category.color }}
                  >
                    {item.category.icon}
                  </span>
                  <div>
                    <h6 className="font-bold text-foreground leading-none mb-1">
                      {item.title}
                    </h6>
                    <p className="text-xs text-muted-foreground font-medium">
                      {item.note || "No notes"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    style={{
                      color: item.category.color,
                      backgroundColor: `${item.category.color}30`,
                    }}
                    className="border-none px-3 py-1 font-medium"
                  >
                    {item.category.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium text-muted-foreground">
                  {formatDate(item?.created_at ?? "Date Unknown")}
                </TableCell>
                <TableCell className="font-bold text-green-500">
                  + {currencySymbol}
                  {item.amount.toLocaleString()}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No income transactions.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showPagination && (
        <div className="flex items-center justify-between pt-4 border-t flex-col md:flex-row gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
            -{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeTable;
