import { createBrowserRouter, Outlet } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import CreateProduct from "../features/products/pages/Seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import PublicOnlyRoute from "../features/auth/components/PublicOnlyRoute.jsx";
import AppLayout from "./AppLayout.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import CreateParentProduct from "../features/products/pages/Seller/CreateParentProduct.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/product/:productId", element: <ProductDetail /> },
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
            element: <CreateParentProduct />,
          },
          {
            path: "create-product/:productId/variant",
            element: <CreateProduct />,
          },
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
