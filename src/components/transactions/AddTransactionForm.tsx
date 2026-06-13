import type { TransactionType } from "@/types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldGroup, FieldSet } from "../ui/field";
import FormField from "../shared/FormField";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";
import TransactionCategorySelector from "./TransactionCategorySelector";
import { ArrowDown } from "lucide-react";
import { useTransactionStore } from "@/store/TransactionStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Spinner from "../Spinner";
import { toast } from "sonner";
import NewCategoryDialog from "./NewCategoryDialog";
import { useQueryClient } from "@tanstack/react-query";

interface AddTransactionFormPropsTypes {
  transactionType: TransactionType;
  closeDialog: () => void;
}

interface FormInputTypes {
  title: string;
  amount: number | string;
  category_id: string;
  note?: string;
}

const AddTransactionForm = ({
  transactionType,
  closeDialog,
}: AddTransactionFormPropsTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewCategoryDialog, setShowNewCategoryDialog] =
    useState<boolean>(false);

  const { userProfile, user } = useAuthStore();
  const { categories } = useTransactionStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputTypes>({
    defaultValues: {
      title: "",
      amount: "",
      category_id: categories.filter((cat) => cat.type === transactionType)[0]
        .id,
    },
  });

  const currencySymbol = currencies.find(
    (c) => c.code === userProfile?.currency,
  )?.symbol;

  const handleSubmitForm: SubmitHandler<FormInputTypes> = async (data) => {
    setLoading(true);
    const formData = {
      ...data,
      amount: Number(data.amount),
      type: transactionType,
      user_id: user?.id,
      wallet_id: userProfile?.current_wallet_id,
    };

    const res = await supabase
      .from("transactions")
      .insert(formData)
      .select("*")
      .single();

    if (res.error) {
      setLoading(false);
      toast.error("Something went wrong during insert transaction!");
      console.log(res.error);
    }

    if (res?.data) {
      setLoading(false);
      toast.success("Transaction added successfully.");
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
      // console.log(res?.data);
      closeDialog();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FieldSet>
          <ScrollArea className="h-[45vh] p-3 pb-0 overflow-hidden border-y">
            <FieldGroup className="gap-3">
              {/* title of the transaction */}
              <FormField
                labelClassName="text-base font-semibold"
                label="Transaction Title:"
                name="title"
                errors={errors}
              >
                <Input
                  type="text"
                  className="h-13 px-3 md:text-base font-semibold border border-accent focus:shadow focus:shadow-accent"
                  placeholder="e.g. Salary of April, 2026"
                  {...register("title", {
                    required: "Transaction must have a title",
                  })}
                />
              </FormField>

              {/* amount */}
              <FormField
                label="Amount:"
                name="amount"
                labelClassName="text-base font-semibold"
                errors={errors}
              >
                <div className="flex items-center border border-accent rounded-lg px-3 py-2 focus-within:shadow focus:shadow-accent">
                  <span className="text-xl font-bold">{currencySymbol}</span>
                  <Input
                    type="number"
                    className="border-none shadow-none md:text-lg font-bold"
                    placeholder="0.00"
                    {...register("amount")}
                  />
                </div>
              </FormField>

              {/* transaction category */}
              <FormField
                label="Category:"
                labelClassName="text-base font-semibold"
                name="category_id"
                errors={errors}
              >
                <Controller
                  name="category_id"
                  control={control}
                  rules={{
                    required: "Please select a category of your transaction.",
                  }}
                  render={({ field }) => {
                    // console.log(field);
                    return (
                      <div>
                        <div className="relative">
                          {/* category selector */}
                          <TransactionCategorySelector
                            value={field.value}
                            onChange={field.onChange}
                            transactionType={transactionType}
                            // showDialog={showNewCategoryDialog}
                            setShowDialog={setShowNewCategoryDialog}
                          />
                          {categories.filter(
                            (cat) => cat.type === transactionType,
                          ).length > 4 && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent pointer-events-none" />
                          )}
                          {/* Bottom fade hint — signals more content below */}
                        </div>
                        {categories.filter(
                          (cat) => cat.type === transactionType,
                        ).length > 4 && (
                          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <span className="animate-bounce">
                              <ArrowDown size={12} />
                            </span>
                            Scroll to see all the categories
                          </p>
                        )}
                        {errors.category_id && (
                          <span>Error on category selection</span>
                        )}
                      </div>
                    );
                  }}
                />
              </FormField>

              {/* transaction notes */}
              <FormField
                name="note"
                errors={errors}
                label="Note:"
                isOptional={true}
                labelClassName="font-semibold text-base"
              >
                <Textarea
                  {...register("note")}
                  className="border border-accent focus:shadow focus:shadow-accent md:text-base font-semibold"
                  placeholder="Any note for this transaction?"
                />
              </FormField>
            </FieldGroup>
          </ScrollArea>

          {/* buttons */}
          <Field className="pb-6">
            <Button type="submit">
              {loading ? (
                <>
                  <Spinner darkBg /> Saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Field>
        </FieldSet>
      </form>
      <NewCategoryDialog
        showDialog={showNewCategoryDialog}
        setShowDialog={setShowNewCategoryDialog}
      />
    </>
  );
};

export default AddTransactionForm;
