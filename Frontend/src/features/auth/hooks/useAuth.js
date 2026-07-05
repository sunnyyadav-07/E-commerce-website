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
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLoginUser({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleSetUserRole({ role }) {
    try {
      dispatch(setLoading(true));
      const data = await setUserRole({ role });
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
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
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleSendEmailForgotPassword(email) {
    try {
      dispatch(setLoading(true));
      const data = await sendEmailForgotPassword(email);
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleResetPassword(data) {
    try {
      dispatch(setLoading(true));
      const data = await resetPassword(data);
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
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
