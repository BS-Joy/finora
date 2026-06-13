import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/AuthStore";
import Spinner from "../Spinner";

const WalletSelector = ({ customClass }: { customClass?: string }) => {
  const { userProfile, setCurrentWallet } = useAuthStore();

  const { data, error, isPending } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await supabase.from("wallets").select();

      if (res?.error) {
        console.log(res?.error);
        throw new Error(res.error.message);
      }
      return res?.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="8" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-sm">
        Couldn't load wallets. Something went wrong!
      </p>
    );
  }

  const currentWallet = userProfile?.current_wallet;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "bg-input flex items-center gap-2 justify-between rounded-md px-3 py-1 cursor-pointer focus-visible:outline-0",
          customClass,
        )}
      >
        <div className="flex gap-3">
          <span className="bg-white rounded-full w-8 h-8">
            {currentWallet?.icon}
          </span>
          <div className="flex flex-col gap-1 text-start leading-none">
            <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
              {currentWallet?.name}
            </span>
            <span className="text-muted-foreground dark:text-white/70 max-w-[20ch] truncate text-xs">
              Current Balance: {currentWallet?.current_balance}
            </span>
          </div>
        </div>
        <ChevronsUpDownIcon color="#5f6e5e" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-66">
        <DropdownMenuLabel>Wallets</DropdownMenuLabel>
        {data.map((w) => (
          <DropdownMenuItem
            key={w.id}
            onClick={() => setCurrentWallet(w)}
            className="border-b"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center ">
                {w.icon}
              </div>
              <div className="flex flex-col gap-1 text-start leading-none">
                <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
                  {w.name}
                </span>
                <span className="text-muted-foreground dark:text-white/70 max-w-[20ch] truncate text-xs">
                  Current Balance: {w.current_balance}
                </span>
              </div>
            </div>
            {currentWallet?.name === w?.name && (
              <CheckIcon className="ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletSelector;
