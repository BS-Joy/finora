import type { TransactionWithCategory } from "@/types";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2, MessageSquareX } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import IncomeEditDialog from "./IncomeEditDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
// import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/AuthStore";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IncomeCardProps {
  transaction: TransactionWithCategory;
  currencySymbol: string;
}

const IncomeCard = ({ transaction, currencySymbol }: IncomeCardProps) => {
  const formattedAmount = `+ ${currencySymbol}${Number(
    transaction.amount,
  ).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;

  const [openDrwaer, setOpenDrawer] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const { currentWallet, setCurrentWallet } = useAuthStore();

  const queryClient = useQueryClient();

  const handleDelete = async (item: TransactionWithCategory) => {
    if (!currentWallet?.id) {
      toast.error("No wallet selected");
      return;
    }

    const res = await supabase
      .from("transactions")
      .delete()
      .eq("id", item.id)
      .select()
      .single();

    if (res.error) {
      console.log(res.error);
      throw new Error(res.error.message);
    }

    if (res?.data) {
      const walletUpdate = {
        current_balance: currentWallet?.current_balance - item.amount,
        total_income: currentWallet?.total_income - item.amount,
      };

      const { data: result, error } = await supabase
        .from("wallets")
        .update(walletUpdate)
        .eq("id", currentWallet?.id)
        .select()
        .single();

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      if (result) {
        setCurrentWallet({ ...currentWallet, ...walletUpdate });
        toast.success("Transaction deleted successfully.");
        queryClient.invalidateQueries({
          queryKey: ["recentTransactions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["wallets"],
        });
        queryClient.invalidateQueries({
          queryKey: ["incomeTransactions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["incomeExpenseData"],
        });
        queryClient.invalidateQueries({
          queryKey: ["spendingByCategory"],
        });
      }
    }
  };

  return (
    <>
      <Drawer open={openDrwaer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger onClick={() => setOpenDrawer(true)} asChild>
          <div className="bg-card border rounded-lg p-3 mb-4 last:mb-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className="p-2 rounded flex items-center justify-center shrink"
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
                  <span className="font-bold text-green-500">
                    + {currencySymbol}
                    {transaction.amount}
                  </span>
                  <span className="text-[12px]">
                    {formatDate(transaction?.created_at ?? "Date Unknown")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="z-101 rounded-t-[28px] border-t border-border bg-card px-4 pb-5 pt-3 shadow-none">
          {/* <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-border/80" /> */}

          <div className="flex flex-col items-start gap-5 px-1">
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-[14px] text-xl shadow-sm"
                style={{ backgroundColor: `${transaction.category.color}22` }}
              >
                {transaction.category.icon}
              </span>
            </div>

            <div className="w-full">
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                {transaction.title}
              </h3>
              <p className="mt-2 text-[32px] font-bold tracking-[-0.05em] text-green-500">
                {formattedAmount}
              </p>
            </div>

            <div className="grid w-full gap-3 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Date</span>
                <span className="text-right font-medium text-foreground">
                  {formatDate(transaction?.created_at ?? "Date Unknown")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Category</span>
                <span className="text-right font-medium text-foreground">
                  {transaction.category.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Notes</span>
                <span className="text-right font-medium text-foreground">
                  {transaction.note || "No notes"}
                </span>
              </div>
            </div>
          </div>

          <DrawerFooter className="grid grid-cols-2 gap-3 p-0 pt-5">
            <DrawerClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-2xl border-0 bg-muted text-base font-semibold text-foreground shadow-none hover:bg-muted/80"
                onClick={() => setOpenEditDialog(true)}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button
                className="h-12 rounded-2xl border-0 bg-destructive/10 text-base font-semibold text-destructive shadow-none hover:bg-[#F3D2D0] flex justify-center items-center gap-2"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>

              {/* <Button
              type="button"
              variant="outline"
              className="h-12 rounded-2xl border-0 bg-[#F9DAD9] text-base font-semibold text-[#C94B4B] shadow-none hover:bg-[#F3D2D0]"
            >
              
            </Button> */}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* delete dialog */}
      <ConfirmationDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        action={() => handleDelete(transaction)}
      />

      {/* edit dialog */}
      <IncomeEditDialog
        transaction={transaction}
        showDialog={openEditDialog}
        setShowDialog={setOpenEditDialog}
      />
    </>
  );
};

export default IncomeCard;
