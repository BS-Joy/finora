import { Link, Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Spinner from "../Spinner";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Header from "./Header";
import { useTransactionStore } from "@/store/TransactionStore";

const Layout = ({ noProfile }: { noProfile: boolean }) => {
  const { user, setUser, setUserProfile, setCurrentWallet } = useAuthStore();
  const { setCategories } = useTransactionStore();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const {
    isPending: userPending,
    isError: userError,
    error: userErrorMsg,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await supabase.auth.getUser();
      if (res.error) {
        throw new Error(res.error.message);
      }
      setUser(res.data.user);
      return res.data.user;
    },
  });

  const { isPending: profilePending, isError: profileError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await supabase.auth.getUser();
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*, current_wallet: current_wallet_id (*)")
        .eq("user_id", res.data.user?.id)
        .maybeSingle();

      if (profileError) {
        console.error(profileError);
      } else {
        setUserProfile(data);
        setCurrentWallet(data?.current_wallet);
      }

      return data;
    },
  });

  const { isPending: categoriesPending, isError: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await supabase.auth.getUser();
      const { data: categories, error: categoryErrors } = await supabase
        .from("categories")
        .select()
        .or(`user_id.eq.${res.data.user?.id}, user_id.is.null`);

      if (categoryErrors) {
        console.log(categoryErrors);
        throw categoryErrors;
      }

      if (categories) {
        setCategories(categories);
      }

      return categories;
    },
  });

  const isPending = userPending || profilePending || categoriesPending;
  const isError = userError || profileError || categoriesError;
  const error = userErrorMsg;

  if (isPending) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner size="16" />
      </div>
    );
  }

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        Error:{" "}
        {error instanceof Error ? (
          <span>
            {error.message}. Please{" "}
            <Link className="underline decoration-accent" to="/login">
              Log in
            </Link>{" "}
            to continue
          </span>
        ) : (
          "Unknown error"
        )}
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Header />
      <Outlet />
      {isMobile && !noProfile && <BottomNavbar />}
    </>
  );
};

export default Layout;
