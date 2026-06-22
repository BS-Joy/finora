import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies, walletIcons } from "@/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type Dispatch, type SetStateAction } from "react";
import Spinner from "@/components/Spinner";
import FormField from "@/components/FormField";
import { useAuthStore } from "@/store/AuthStore";
import { supabase } from "@/lib/supabase";

interface ProfileInputs {
  currency: string;
  wallet: string;
  icon: string;
}

const ProfileCreationForm = ({
  setShowDialog,
}: {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm: SubmitHandler<ProfileInputs> = async (data) => {
    setLoading(true);
    // 1. Create profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        currency: data.currency,
        user_id: user?.id,
      })
      .select()
      .single();
    if (profileError) {
      console.error(profileError);
      return;
    }
    // 2. Create wallet
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .insert({
        user_id: user?.id,
        name: data.wallet,
        description: "",
        icon: data.icon,
        current_balance: 0,
        total_income: 0,
        total_expenses: 0,
      })
      .select()
      .single();
    if (walletError) {
      console.error(walletError);
      return;
    }

    if (profile && wallet) {
      setShowDialog(false);
      console.log(profile, wallet);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet>
          <FieldLegend className="mb-4 font-semibold">
            Create Profile & Wallet to continue
          </FieldLegend>
          <FieldGroup>
            {/* currency field */}
            <FormField
              label="Select Your Preffered Currency."
              name="currency"
              errors={errors}
            >
              <Controller
                name="currency"
                control={control}
                rules={{
                  required: "Please Set your preferred currency to get started",
                }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Currency</SelectLabel>

                        {currencies
                          .sort((a, b) => a.currency.localeCompare(b.currency))
                          .map((c) => (
                            <SelectItem value={c.code} key={c.code}>
                              {c.code} - {c.currency}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            {/* wallet fields */}
            <FieldGroup className="flex-row items-center">
              {/* wallet icon */}
              <FormField
                className="w-1/3"
                name="icon"
                errors={errors}
                label="Wallet Icon"
              >
                <Controller
                  name="icon"
                  control={control}
                  rules={{
                    required: "Select a wallet icon",
                  }}
                  render={({ field }) => {
                    return (
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-35">
                          <SelectValue placeholder="Select Icon"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Wallet Icons</SelectLabel>
                            {walletIcons.map((item) => {
                              const Icon = item.icon;
                              return (
                                <SelectItem key={item.name} value={item.name}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </FormField>

              {/* wallet name */}
              <FormField
                name="wallet"
                errors={errors}
                label="Create your First Wallet"
              >
                <Input
                  id="wallet"
                  placeholder="Enter Wallet Name"
                  {...register("wallet", {
                    required: "Create your first wallet to continue",
                  })}
                />
              </FormField>
            </FieldGroup>

            {/* submit button */}
            <Field>
              <Button type="submit">{loading ? <Spinner /> : "Done"}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default ProfileCreationForm;
