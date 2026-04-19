import { useDispatch } from "react-redux";
import { registerUser } from "../service/auth.api";
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
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { handleRegisterUser, handleLoginUser };
};
export default useAuth;
