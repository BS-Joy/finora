import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IncomePage from "./pages/income/IncomePage";
import Layout from "./components/layout/Layout";
import ErrorPage from "./components/ErrorPage";
import ExpensesPage from "./pages/expense/ExpensesPage";
import SettingsPage from "./pages/setting/SettingsPage";
import { ThemeProvider } from "./components/theme-provider";
import { supabase } from "./lib/supabase";
import { useState } from "react";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  const [noProfile, setNoProfile] = useState<boolean>(false);
  const router = createBrowserRouter([
    {
      element: <Layout noProfile={noProfile} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          loader: async () => {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            const { data, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("user_id", user?.id)
              .maybeSingle();

            if (error) {
              console.error("Error on checking user profile existence:", error);
              return;
            }

            const profileExists = data?.id ? true : false;
            setNoProfile(!profileExists);

            return profileExists;
          },
        },
        {
          path: "/income",
          element: <IncomePage />,
        },
        {
          path: "/expenses",
          element: <ExpensesPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="finora-theme">
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
