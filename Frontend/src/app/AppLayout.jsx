import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useWishList } from "../features/wishList/hooks/useWishList";
import { useCart } from "../features/addToCart/hooks/useCart";

const AppLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const { handleGetAllWisgListItems } = useWishList();
  const { handleGetAllCartProducts } = useCart();

  useEffect(() => {
    if (user?.role === "buyer") {
      handleGetAllWisgListItems();
      handleGetAllCartProducts();
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
