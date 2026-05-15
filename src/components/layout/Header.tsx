import { AvatarDropDown } from "@/components/dashboard/AvatarDropDown";
import { format } from "date-fns";
import { useAuthStore } from "@/store/AuthStore";
import { ThemeToggle } from "../theme-toggle";
import Logo from "../Logo";
import WalletSelector from "./WalletSelector";
import NewTransactionDialog from "../dashboard/NewTransactionDialog";

const Header = () => {
  const { user } = useAuthStore();
  const today = format(new Date(), "d MMMM, yyyy");

  return (
    <header className="lg:ml-69 flex bg-card md:bg-transparent justify-between items-center py-7 pre-sm:px-6 px-3">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold">
          Hey There, {user?.user_metadata?.name}
        </h1>
        <p className="font-semibold mt-2">It's {today} today.</p>
      </div>
      <Logo textColor="primary" darkTextColor="cream" style="md:hidden" />

      <div className="flex items-center gap-4">
        <NewTransactionDialog />
        <div className="hidden md:block lg:hidden">
          <WalletSelector />
        </div>
        <ThemeToggle />
        <AvatarDropDown />
      </div>
    </header>
  );
};

export default Header;
