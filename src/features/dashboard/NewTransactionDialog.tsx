import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TransactionType } from "@/types";
import AddTransactionForm from "../transactions/AddTransactionForm";

interface TransactionTab {
  name: string;
  value: TransactionType;
  icon: LucideIcon;
}

const tabs: TransactionTab[] = [
  {
    name: "Income",
    value: "income",
    icon: TrendingUp,
  },
  {
    name: "Expense",
    value: "expense",
    icon: TrendingDown,
  },
];

const NewTransactionDialog = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType>("income");
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          className="w-9 h-9 rounded-full"
          onClick={() => setShowDialog(true)}
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex max-h-[80vh] flex-col gap-0 p-0 overflow-hidden sm:max-w-md"
        overlayBG="bg-primary/20"
      >
        <Tabs
          value={transactionType}
          onValueChange={(value) =>
            setTransactionType(value as TransactionType)
          }
          className="gap-4 flex flex-col p-6 pb-0"
        >
          <DialogHeader className="contents space-y-0 text-left border-b bg-red-500">
            <DialogTitle className="px-6 pt-6 pb-4 text-xl font-semibold">
              Add Transaction
            </DialogTitle>

            <TabsList className="flex justify-center w-full rounded-lg p-2">
              {tabs.map(({ icon: Icon, name, value }) => {
                const activeTab = value === transactionType;
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className={cn(
                      "flex items-center gap-1 cursor-pointer px-2.5 py-2 font-semibold sm:px-3 rounded-md bg-transparent",
                      activeTab &&
                        value === "income" &&
                        "bg-primary text-accent hover:text-accent dark:bg-accent dark:text-primary dark:hover:text-primary",

                      activeTab &&
                        value === "expense" &&
                        "bg-destructive text-white dark:text-white hover:text-white",
                    )}
                  >
                    <Icon />
                    {name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </DialogHeader>
          {/* tab contents */}
          <TabsContent
            value={transactionType}
            className="flex-1 overflow-hidden"
          >
            <AddTransactionForm
              key={transactionType}
              transactionType={transactionType}
              closeDialog={() => setShowDialog(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionDialog;
