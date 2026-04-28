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

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
