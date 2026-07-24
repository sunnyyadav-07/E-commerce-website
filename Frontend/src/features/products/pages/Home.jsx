import { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../hooks/useProduct";

import Navbar      from "../components/Navbar";
import HeroBanner  from "../components/HeroBanner";
import FilterStrip from "../components/FilterStrip";
import ProductCard from "../components/ProductCard";
import HomeFooter  from "../components/HomeFooter";
import Loading     from "../../shared/components/Loading";

const Home = () => {
  const products = useSelector((state) => state.product.allProducts);
  const loading  = useSelector((state) => state.product.loading);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F4] font-sans">

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Filter Strip ── */}
      <FilterStrip totalCount={products?.length ?? 0} />

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        {loading ? (
          <div className="py-40 flex items-center justify-center">
            <Loading message="Loading collection…" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <p className="text-sm font-semibold text-stone-500">No products found.</p>
            <p className="text-xs text-stone-400">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <HomeFooter />

    </div>
  );
};

export default Home;
