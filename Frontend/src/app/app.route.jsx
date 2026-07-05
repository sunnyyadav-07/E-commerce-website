import { createBrowserRouter, Outlet } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import PublicOnlyRoute from "../features/auth/components/PublicOnlyRoute.jsx";
import AppLayout from "./AppLayout.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import CreateParentProduct from "../features/products/pages/Seller/CreateParentProduct.jsx";
import CreateProductVariants from "../features/products/pages/Seller/CreateProductVariants.jsx";
import Cart from "../features/addToCart/pages/Cart.jsx";
import CartProtected from "../features/addToCart/components/CartProtected.jsx";
import WishList from "../features/wishList/pages/WishList.jsx";
import EditProduct from "../features/products/pages/Seller/EditProduct.jsx";
import Catalog from "../features/catalogs/Pages/Catalog.jsx";
import SearchedProducts from "../features/search/pages/SearchedProducts.jsx";
import ResetPassword from "../features/auth/pages/ResetPassword.jsx";
import ForgotPassword from "../features/auth/pages/ForgotPassword.jsx";

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
        path: "my-cart",
        element: (
          <CartProtected>
            <Cart />
          </CartProtected>
        ),
      },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "products/catalog/:category", element: <Catalog /> },
      { path: "wishlist", element: <WishList /> },
      { path: "products", element: <SearchedProducts /> },
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
            element: <CreateProductVariants />,
          },
          {
            path: "products/:productId/edit",
            element: <EditProduct />,
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
