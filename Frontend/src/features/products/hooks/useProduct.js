import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/product.api";
import { setSellerProduct } from "../state/product.slice";

const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data;
  }
  async function handleGetSellerProduct() {
    const data = await getSellerProducts();
    dispatch(setSellerProduct(data.products));
    return data;
  }
  return { handleCreateProduct, handleGetSellerProduct };
};
export default useProduct;
