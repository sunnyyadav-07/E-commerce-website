import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

export const useAuthGuard = () => {
  const { user } = useSelector((state) => state.auth); 
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = (callback) => {
    if (!user) {
      navigate("/login", { state: location.state });
      return;
    }
    callback();
  };

  return { requireAuth, isLoggedIn: !!user };
};
