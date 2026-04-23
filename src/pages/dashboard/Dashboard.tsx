import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { redirect, Link } from "react-router";

const Dashboard: FC = () => {
  const { user, setUser } = useAuthStore();

  //   const { isPending, isError, error } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: async () => {
  //       const res = await supabase.auth.getUser();
  //       if (res.error) {
  //         throw new Error(res.error.message);
  //       }
  //       setUser(res.data.user);
  //       return res.data.user;
  //     },
  //   });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      setUser(null);
      redirect("/login");
    }
  };

  //   if (isError) {
  //     console.log(error);
  //     return (
  //       <div className="flex justify-center">
  //         Error:{" "}
  //         {error instanceof Error ? (
  //           <span>
  //             {error.message}. Please{" "}
  //             <Link className="underline decoration-accent" to="/login">
  //               Log in
  //             </Link>{" "}
  //             to continue
  //           </span>
  //         ) : (
  //           "Unknown error"
  //         )}
  //       </div>
  //     );
  //   }

  //   console.log(user);

  return (
    <div>
      <h1>Welcome to Finora</h1>
      <p>{user?.id && user?.user_metadata?.name}</p>{" "}
      {user?.id && (
        <Button className="" variant="destructive" onClick={handleLogout}>
          Log out
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
