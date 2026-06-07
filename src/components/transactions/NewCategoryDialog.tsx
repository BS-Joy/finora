import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TransactionType } from "@/types";
import AddCategoryForm from "./AddCategoryForm";

const NewCategoryDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType>("income");
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          type="button"
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
      </DialogTrigger>
      <DialogContent
        className="flex max-h-[80vh] flex-col gap-0 p-0 overflow-hidden sm:max-w-md"
        overlayBG="bg-primary/20"
      >
        <DialogHeader className="contents space-y-0 text-left border-b bg-red-500">
          <DialogTitle className="px-6 pt-6 text-xl font-semibold">
            Add Category
          </DialogTitle>
          <AddCategoryForm
            closeDialog={() => setShowDialog(false)}
            transactionType={transactionType}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryDialog;
