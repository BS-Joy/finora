import { AvatarDropDown } from "@/components/dashboard/AvatarDropDown";
import { format } from "date-fns";
import { useAuthStore } from "@/store/AuthStore";
import { ThemeToggle } from "../theme-toggle";
import Logo from "../Logo";

const Header = () => {
  const { user } = useAuthStore();
  const today = format(new Date(), "d MMMM, yyyy");

  return (
    <header className="ml-2 md:ml-69 flex justify-between items-center py-7 px-4 rounded-lg">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold">
          Hey There, {user?.user_metadata?.name}
        </h1>
        <p className="font-semibold mt-2">It's {today} today.</p>
      </div>
      <Logo textColor="primary" darkTextColor="cream" style="md:hidden" />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <AvatarDropDown />
      </div>
    </header>
  );
};

export default Header;
