import { useAuthStore } from "@/store/AuthStore";
import { currencies } from "@/utils";

const useCurrencySymbol = () => {
  const { userProfile } = useAuthStore();
  const currencySymbol =
    currencies.find((c) => c.code === userProfile?.currency)?.symbol || "$";
  return currencySymbol;
};

export default useCurrencySymbol;
