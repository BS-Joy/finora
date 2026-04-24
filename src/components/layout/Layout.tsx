import { Link, Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Spinner from "../Spinner";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { user, setUser } = useAuthStore();

  const { isPending, isError, error } = useQuery({
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
      <Outlet />
    </>
  );
};

export default Layout;
