import { useDispatch } from "react-redux";
import { getCatalogProducts } from "../services/catalog.api";
import {
  setCatalogProducts,
  setError,
  setLoading,
} from "../state/catalog.slice";

const useCatalog = () => {
  const dispatch = useDispatch();
  async function getProductsCatalog(category) {
    try {
      dispatch(setLoading(true));
      const res = await getCatalogProducts(category);
      dispatch(setCatalogProducts(res.products));
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { getProductsCatalog };
};
export default useCatalog