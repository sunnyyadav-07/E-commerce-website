import { createBrowserRouter, Outlet } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import CreateProduct from "../features/products/pages/Seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import PublicOnlyRoute from "../features/auth/components/PublicOnlyRoute.jsx";
import AppLayout from "./AppLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "select-role",
        element: (
          <Protected>
            <SelectRole />
          </Protected>
        ),
      },

      {
        path: "seller",
        element: (
          <Protected role="seller">
            <Outlet />
          </Protected>
        ),
        children: [
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "dashboard",
            element: <SellerDashboard />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
