import { useMediaQuery } from "@/hooks/useMediaQuery";
import Logo from "../Logo";
import { AnimatePresence, motion } from "framer-motion";
import SidebarNavigation from "./SidebarNavigation";
import { useAuthStore } from "@/store/AuthStore";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import { redirect } from "react-router";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, setUser } = useAuthStore();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
    } else {
      setUser(null);
      redirect("/login");
    }
  };
  return (
    <AnimatePresence>
      {isDesktop && (
        <motion.aside
          key="sidebar"
          className="font-jakarta w-68 bg-card border h-screen fixed flex flex-col justify-between"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          exit={{ opacity: 0, x: -200 }}
        >
          {/* sidebar top */}
          <div>
            {/* logo */}
            <div className="w-full pl-8 py-6 border-b">
              <Logo textColor="primary" />
            </div>

            {/* navigation */}
            <SidebarNavigation />
          </div>

          {/* sidebar footer */}
          <div className="mx-3 pb-8 space-y-6">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 bg-accent/80 rounded-lg border border-white/5 text-primarypulse">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center border border-primary">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || "User"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-lg font-bold">
                      {(user.user_metadata?.full_name || user.email || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold truncate">
                    {user.user_metadata?.full_name || "User"}
                  </span>
                  <span className="text-[10px] truncate">{user.email}</span>
                </div>
              </div>
            )}
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-5 hover:text-red-500 hover:bg-red-300/20 rounded-lg transition-all duration-300 w-full group cursor-pointer"
            >
              <LogOut
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Sign Out</span>
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
