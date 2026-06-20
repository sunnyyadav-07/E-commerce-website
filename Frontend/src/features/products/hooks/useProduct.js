import { useDispatch } from "react-redux";
import {
  createParentProduct,
  createProductVariant,
  getAllProducts,
  getSellerProducts,
  getProductDetails,
  updateProduct,
} from "../services/product.api";
import {
  setAllProducts,
  setError,
  setLoading,
  setSellerProduct,
} from "../state/product.slice";

const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateParentProduct(formData) {
    try {
      dispatch(setLoading(true));
      const data = await createParentProduct(formData);
      return data.product;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleCreateProductVariant(productId, formData) {
    try {
      dispatch(setLoading(true));
      const data = await createProductVariant(productId, formData);
      return data.product;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
       throw error;
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
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
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
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
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
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleUpdateProduct(productId, variantId, updatedData) {
    try {
      dispatch(setLoading(true));
      const data = await updateProduct(productId, variantId, updatedData);
      return data.updatedData;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleCreateParentProduct,
    handleCreateProductVariant,
    handleGetSellerProduct,
    handleGetAllProducts,
    handleGetProductDetails,
    handleUpdateProduct,
  };
};
export default useProduct;
