import { useEffect } from "react";
import { useParams } from "react-router";
import useCatalog from "../hooks/useCatalog";
import { useSelector } from "react-redux";
import CatalogHeader from "../components/CatalogHeader";
import CatalogSidebar from "../components/CatalogSidebar";
import CatalogGrid from "../components/CatalogGrid";

const Catalog = () => {
  const { category } = useParams();
  const { getProductsCatalog } = useCatalog();
  const products = useSelector((state) => state.catalog.catalogProducts);
  const loading = useSelector((state) => state.catalog.loading);

  useEffect(() => {
    (async () => {
      await getProductsCatalog(category);
    })();
  }, [category]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white my-6 rounded-2xl shadow-sm">
        {/* Header */}
        <CatalogHeader
          title={category || "All Products"}
          productCount={products?.length || 0}
        />

        {/* Main Content */}
        <div className="flex flex-col md:flex-row mt-8 gap-8">
          <CatalogSidebar products={products} />
          <CatalogGrid products={products} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
