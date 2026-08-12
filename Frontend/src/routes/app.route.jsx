import { createBrowserRouter, Navigate } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import SelectRole from "../features/auth/pages/SelectRole.jsx";
import SellerDashboard from "../features/products/pages/Seller/SellerDashboard.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import CreateParentProduct from "../features/products/pages/Seller/CreateParentProduct.jsx";
import CreateProductVariants from "../features/products/pages/Seller/CreateProductVariants.jsx";
import Cart from "../features/addToCart/pages/Cart.jsx";
import WishList from "../features/wishList/pages/WishList.jsx";
import EditProduct from "../features/products/pages/Seller/EditProduct.jsx";
import Catalog from "../features/catalogs/Pages/Catalog.jsx";
import SearchedProducts from "../features/search/pages/SearchedProducts.jsx";
import ResetPassword from "../features/auth/pages/ResetPassword.jsx";
import ForgotPassword from "../features/auth/pages/ForgotPassword.jsx";
import Public from "./protected/Public.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import MainLayout from "../Layouts/MainLayout.jsx";
import SellerLayout from "../Layouts/SellerLayout.jsx";
import SellerProtected from "./protected/SellerProtected.jsx";
import Order from "../features/orders/pages/seller/Order.jsx";
import PendingOrder from "../features/orders/pages/seller/PendingOrder.jsx";
import CancelledOrder from "../features/orders/pages/seller/CancelledOrder.jsx";
import DeliveredOrder from "../features/orders/pages/seller/DeliveredOrder.jsx";
import FillAddressForm from "../features/orders/pages/buyer/FillAddressForm.jsx";
import OrderSuccess from "../features/orders/pages/buyer/OrderSuccess.jsx";
import OrderDetails from "../features/orders/pages/buyer/OrderDetails.jsx";
import MyOrder from "../features/orders/pages/buyer/MyOrder.jsx";
import AllOrder from "../features/orders/pages/buyer/AllOrder.jsx";
import Pending from "../features/orders/pages/buyer/Pending.jsx";
import Processing from "../features/orders/pages/buyer/Processing.jsx";
import Shipped from "../features/orders/pages/buyer/Shipped.jsx";
import Delivered from "../features/orders/pages/buyer/Delivered.jsx";
import Cancelled from "../features/orders/pages/buyer/Cancelled.jsx";
import Protected from "./protected/Protected.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "reset-password", element: <ResetPassword /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "select-role", element: <SelectRole /> },
        ],
      },
    ],
  },
  {
    path: "/",

    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:productId", element: <ProductDetail /> },
      { path: "products/catalog/:category", element: <Catalog /> },
      { path: "products", element: <SearchedProducts /> },
      {
        path: "",
        element: <Protected />,
        children: [
          { path: "my-cart", element: <Cart /> },
          { path: "wishlist", element: <WishList /> },
          { path: "checkout/address", element: <FillAddressForm /> },
          { path: "order-success/:orderId", element: <OrderSuccess /> },

          { path: "order/:orderId", element: <OrderDetails /> },
          {
            path: "my-orders",
            element: <MyOrder />,
            children: [
              { index: true, element: <Navigate to="all-order" replace /> },
              { path: "all-order", element: <AllOrder /> },
              { path: "pending", element: <Pending /> },
              { path: "processing", element: <Processing /> },
              { path: "shipped", element: <Shipped /> },
              { path: "delivered", element: <Delivered /> },
              { path: "cancelled", element: <Cancelled /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/seller",
    element: <SellerProtected />,
    children: [
      {
        path: "",
        element: <SellerLayout />,
        children: [
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "create-product", element: <CreateParentProduct /> },
          {
            path: "create-product/:productId/variant",
            element: <CreateProductVariants />,
          },
          { path: "products/:productId/edit", element: <EditProduct /> },
          {
            path: "order",
            element: <Order />,
            children: [
              { index: true, element: <Navigate to="pending" replace /> },
              { path: "pending", element: <PendingOrder /> },
              { path: "cancelled", element: <CancelledOrder /> },
              { path: "delivered", element: <DeliveredOrder /> },
            ],
          },
        ],
      },
    ],
  },
]);
