import { useDispatch } from "react-redux";
import {
  registerUser,
  loginUser,
  setUserRole,
  getMe,
} from "../service/auth.api";
import { setError, setLoading, setUser } from "../state/auth.slice";

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
      dispatch(setUser(data));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLoginUser({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleSetUserRole({ role }) {
    try {
      dispatch(setLoading(true));
      const data = await setUserRole({ role });
      // dispatch(setUser(data));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
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
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleRegisterUser,
    handleLoginUser,
    handleSetUserRole,
    handleGetMe,
  };
};
export default useAuth;
