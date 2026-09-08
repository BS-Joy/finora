import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { TransactionWithCategory } from "@/types";
import EditIncomeForm from "./EditIncomeForm";

const IncomeEditDialog = ({
  transaction,
}: {
  transaction: TransactionWithCategory;
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex max-h-[80vh] flex-col gap-0 p-6 py-0 overflow-hidden sm:max-w-md"
        overlayBG="bg-primary/20"
        // onOpenAutoFocus={(event) => {
        //   // Don't let Dialog automatically focus the first element
        //   event.preventDefault();
        // }}
      >
        <DialogHeader className="contents space-y-0 text-left border-b bg-red-500">
          <DialogTitle className="px-6 pt-6 pb-4 text-xl font-semibold">
            Edit Income
          </DialogTitle>
        </DialogHeader>

        {/* edit transaction form */}
        <EditIncomeForm
          key={transaction.id}
          transaction={transaction}
          closeDialog={() => setShowDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default IncomeEditDialog;
