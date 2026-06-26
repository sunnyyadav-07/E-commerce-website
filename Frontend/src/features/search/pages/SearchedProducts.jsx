import { useSearchParams } from "react-router";
import SearchHeader from "../components/SearchHeader";
import CatalogGrid from "../../catalogs/components/CatalogGrid";
import { useEffect, useState } from "react";
import useCatalog from "../../catalogs/hooks/useCatalog";
import { useSelector } from "react-redux";

const SearchedProducts = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const { getProductsCatalog } = useCatalog();
  const loading = useSelector((state) => state.catalog.loading);
  useEffect(() => {
    (async () => {
      const data = await getProductsCatalog({ search });
      setProducts(data);
    })();
  }, [search]);
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white my-6 rounded-2xl shadow-sm">
        <SearchHeader query={search} productCount={products?.length ?? 0} />
        <div className="mt-8">
          <CatalogGrid products={products} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SearchedProducts;
