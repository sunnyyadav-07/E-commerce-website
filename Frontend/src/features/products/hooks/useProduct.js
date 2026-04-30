import { useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
  getProductDetails
} from "../services/product.api";
import {
  setAllProducts,
  setError,
  setLoading,
  setSellerProduct,
} from "../state/product.slice";

const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      dispatch(setLoading(true));
      const data = await createProduct(formData);
      return data.product;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetSellerProduct() {
    try {
      dispatch(setLoading(true));
      const data = await getSellerProducts();
      dispatch(setSellerProduct(data.products));
      return data.products;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetAllProducts() {
    try {
      dispatch(setLoading(true));
      const data = await getAllProducts();
      dispatch(setAllProducts(data.products));
      return data.products;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetProductDetails(productId) {
    try {
      dispatch(setLoading(true));
      const data = await getProductDetails(productId);
      return data.product;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleCreateProduct,
    handleGetSellerProduct,
    handleGetAllProducts,
    handleGetProductDetails,
  };
};
export default useProduct;
