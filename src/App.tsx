import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
