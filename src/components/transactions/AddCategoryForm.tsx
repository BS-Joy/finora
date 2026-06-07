import type { TransactionType } from "@/types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldGroup, FieldSet } from "../ui/field";
import FormField from "../shared/FormField";
import { Input } from "../ui/input";
import CategoryColorPicker from "./CategoryColorPicker";
import { useAuthStore } from "@/store/AuthStore";
import { categoryIcons } from "@/utils";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Spinner from "../Spinner";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryIconSelector from "./CategoryIconSelector";

interface AddTransactionFormPropsTypes {
  transactionType: TransactionType;
  closeDialog: () => void;
}

interface FormInputTypes {
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
}

const AddCategoryForm = ({
  transactionType,
  closeDialog,
}: AddTransactionFormPropsTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userProfile, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputTypes>({
    defaultValues: {
      name: "",
      type: transactionType,
      color: "",
    },
  });

  const handleSubmitForm: SubmitHandler<FormInputTypes> = async (data) => {
    setLoading(true);
    const formData = {
      ...data,
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
      // console.log(res?.data);
      closeDialog();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="p-6">
        <FieldSet>
          <ScrollArea className="h-[45vh] p-3 pb-0 overflow-hidden border-y">
            <FieldGroup className="gap-3">
              {/* title of the category */}
              <FormField
                labelClassName="text-base font-semibold"
                label="Category Name:"
                name="name"
                errors={errors}
              >
                <Input
                  type="text"
                  className="h-13 px-3 md:text-base font-semibold border border-accent focus:shadow focus:shadow-accent"
                  placeholder="e.g. Side Hustle"
                  {...register("name", {
                    required: "Category must have a name",
                  })}
                />
              </FormField>

              {/* amount */}
              <FormField
                label="Transaction Type:"
                name="type"
                labelClassName="text-base font-semibold"
                errors={errors}
              >
                <Select defaultValue={transactionType}>
                  <SelectTrigger className="w-45 py-6">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormField>

              {/* Category icon */}
              <FormField
                label="Select Icon:"
                labelClassName="text-base font-semibold"
                name="icon"
                errors={errors}
              >
                <Controller
                  name="icon"
                  control={control}
                  rules={{
                    required: "Please select a icon of your category.",
                  }}
                  render={({ field }) => {
                    // console.log(field);
                    return (
                      <div>
                        <div className="relative">
                          {/* category selector */}
                          <CategoryIconSelector
                            value={field.value}
                            onChange={field.onChange}
                            transactionType={transactionType}
                          />
                          {categoryIcons.length > 4 && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent pointer-events-none" />
                          )}

                          {/* Bottom fade hint — signals more content below */}
                        </div>
                        {categoryIcons.length > 4 && (
                          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <span className="animate-bounce">
                              <ArrowDown size={12} />
                            </span>
                            Scroll to see all the categories
                          </p>
                        )}
                        {errors.icon && (
                          <span>Error on category selection</span>
                        )}
                      </div>
                    );
                  }}
                />
              </FormField>

              {/* category color */}
              <FormField
                labelClassName="text-base font-semibold"
                label="Category Color:"
                name="color"
                errors={errors}
              >
                <Controller
                  name="color"
                  control={control}
                  rules={{
                    required: "Please select a color for your category.",
                  }}
                  render={({ field }) => (
                    <CategoryColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
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
    </div>
  );
};

export default AddCategoryForm;
