import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IncomePage from "./pages/income/IncomePage";
import Layout from "./components/layout/Layout";
import ErrorPage from "./components/ErrorPage";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/income",
          element: <IncomePage />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/error",
      element: (
        <ErrorPage
          // onGoHome={() => (window.location.href = "/")}
          code={505}
          description="Just checking"
          title="not found"
        />
      ),
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
