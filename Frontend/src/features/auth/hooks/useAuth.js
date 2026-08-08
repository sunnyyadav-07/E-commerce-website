import { useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  setUserRole,
  getMe,
  logoutUser,
  sendEmailForgotPassword,
  resetPassword,
} from "../service/auth.api";
import { clearUser, setError, setLoading, setUser } from "../state/auth.slice";
import toast from "react-hot-toast";
import { clearCart } from "../../addToCart/state/cart.slice";
import { clearWishlist } from "../../wishList/state/wishlist.slice";

const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegisterUser({
    email,
    password,
    fullname,
    contact,
    isSeller = false,
  }) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({
        email,
        password,
        fullname,
        contact,
        isSeller,
      });
      dispatch(setUser(data.user));
      toast.success("Registered successfully.");
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLoginUser({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data.user));
      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleSetUserRole({ role }) {
    try {
      dispatch(setLoading(true));
      const data = await setUserRole({ role });
      toast.success("Role has been set successfully.");
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLogoutUser() {
    try {
      dispatch(setLoading(true));
      const data = await logoutUser();
      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());
      toast.success("Logout successfully.");
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleSendEmailForgotPassword(email) {
    try {
      const data = await sendEmailForgotPassword(email);
      toast.success("Email has been sent,");
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    }
  }
  async function handleResetPassword(data) {
    try {
      dispatch(setLoading(true));
      const res = await resetPassword(data);
      toast.success("Password reset successfully.");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleRegisterUser,
    handleLoginUser,
    handleSetUserRole,
    handleGetMe,
    handleLogoutUser,
    handleResetPassword,
    handleSendEmailForgotPassword,
  };
};
export default useAuth;
