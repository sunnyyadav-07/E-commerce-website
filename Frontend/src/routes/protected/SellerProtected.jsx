import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "../../features/shared/components/Loading";
const SellerProtected = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) return <Loading />;
  if (user?.role !== "seller") return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default SellerProtected;
