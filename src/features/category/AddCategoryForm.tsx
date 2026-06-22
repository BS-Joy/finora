import type { TransactionType } from "@/types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import FormField from "@/components/FormField";
import { Input } from "@/components/ui/input";
import CategoryColorPicker from "./CategoryColorPicker";
import { useAuthStore } from "@/store/AuthStore";
import { categoryIcons } from "@/utils";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryIconSelector from "./CategoryIconSelector";
import { useQueryClient } from "@tanstack/react-query";

interface AddTransactionFormPropsTypes {
  closeDialog: () => void;
}

interface FormInputTypes {
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
}

const AddCategoryForm = ({ closeDialog }: AddTransactionFormPropsTypes) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryNameError, setCategoryNameError] = useState<string | null>(
    null,
  );
  const debouncedCategoryName = useDebounce(categoryName, 500);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkCategoryName = async () => {
      if (debouncedCategoryName) {
        const { data, error } = await supabase
          .from("categories")
          .select("name")
          .eq("name", debouncedCategoryName)
          .or(`user_id.eq.${user?.id},user_id.is.null`)
          .maybeSingle();

        if (data) {
          setCategoryNameError(
            "This category already exists. Please use a different name.",
          );
        } else {
          setCategoryNameError(null);
        }

        if (error) {
          console.error("Error checking category name:", error);
          setCategoryNameError(
            "An error occurred while checking the category name. Please try again.",
          );
        }
      } else {
        setCategoryNameError(null);
      }
    };
    checkCategoryName();
  }, [debouncedCategoryName, user?.id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputTypes>({
    defaultValues: {
      name: "",
      type: "income",
      color: "#CBEF43",
    },
  });

  const handleSubmitForm: SubmitHandler<FormInputTypes> = async (data) => {
    setLoading(true);
    const formData = {
      ...data,
      user_id: user?.id,
    };

    console.log(formData);

    if (categoryNameError) {
      toast.error("Please resolve the category name error first.");
      return;
    }

    const res = await supabase
      .from("categories")
      .insert(formData)
      .select("*")
      .single();

    if (res.error) {
      setLoading(false);
      toast.error("Something went wrong during creating category!");
      console.log(res.error);
    }

    if (res?.data) {
      setLoading(false);
      toast.success("Category added successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
              {/* name of the category */}
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
                    onChange: (e) => setCategoryName(e.target.value),
                  })}
                />
                {categoryNameError && (
                  <p className="text-red-500 text-sm mt-1">
                    {categoryNameError}
                  </p>
                )}
              </FormField>

              {/* type */}
              <FormField
                label="Transaction Type:"
                name="type"
                labelClassName="text-base font-semibold"
                errors={errors}
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-45 py-6 border border-accent focus:shadow focus:shadow-accent">
                        <SelectValue placeholder="Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
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
                      value={field.value || "#CBEF43"}
                      onChange={field.onChange}
                    />
                  )}
                />
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
                        {/* {errors.icon && (
                          <span>Error on category selection</span>
                        )} */}
                      </div>
                    );
                  }}
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
                "Create Category"
              )}
            </Button>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
};

export default AddCategoryForm;
