import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Zap,
  ShieldCheck,
  Package,
  RotateCcw,
} from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const loading = useSelector((state) => state.product.loading);
  const { handleGetProductDetails } = useProduct();

  useEffect(() => {
    (async () => {
      const data = await handleGetProductDetails(productId);
      setProduct(data);
    })();
  }, [productId]);

  const defaultVariant = product?.variants?.find((v) => v.isDefault) || product?.variants?.[0];
  const images = defaultVariant?.images || product?.images || [];
  const price = defaultVariant?.price || product?.price || { amount: 0, currency: "INR" };
  const currency = price.currency === "INR" ? "₹" : (price.currency === "USD" ? "$" : price.currency);

  // ── Loading State ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-stone-200 border-t-stone-700 animate-spin" />
          <p className="text-xs uppercase tracking-widest text-stone-400">
            Loading product…
          </p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500 text-sm">Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-stone-700 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4] font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <a
            href="/"
            className="text-xl font-bold tracking-[0.15em] uppercase text-stone-900"
          >
            Atelier
          </a>

          <button className="cursor-pointer flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-stone-900 hover:text-stone-600 transition-colors">
            <ShoppingBag className="w-4 h-4" />
            Bag (0)
          </button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            {images?.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] shrink-0 pb-2 md:pb-0">
                {images.map((img, i) => (
                  <button
                    key={img._id || i}
                    onClick={() => setActiveImg(i)}
                    className={`cursor-pointer shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i
                        ? "border-stone-900 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 shadow-xl">
              <img
                key={activeImg}
                src={images?.[activeImg]?.url}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Prev / Next arrows */}
              {images?.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-stone-700" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-stone-700" />
                  </button>

                  {/* Dot indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`cursor-pointer w-1.5 h-1.5 rounded-full transition-all ${
                          activeImg === i ? "bg-white w-4" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col lg:sticky lg:top-24 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-3">
                Atelier Collection
              </p>
              {/* Title row with wishlist */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                  {product.title}
                </h1>
                <button className="cursor-pointer shrink-0 mt-1 w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-stone-900">
                  {currency}
                  {price.amount?.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-stone-400 uppercase tracking-widest">
                  {price.currency}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-200" />

            {/* Description */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">
                About this piece
              </h3>
              <p className="text-stone-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-200" />

            {/* Details List */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">
                Details
              </h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0"></span>
                  Premium quality fabric
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0"></span>
                  {images?.length} high-resolution images available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0"></span>
                  Free shipping on orders above ₹2000
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0"></span>
                  Easy 30-day returns
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-[#3b557e] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-stone-700 active:scale-[0.98] transition-all duration-200">
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { Icon: ShieldCheck, label: "Authentic" },
                { Icon: Package, label: "Free Ship" },
                { Icon: RotateCcw, label: "30-Day Return" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-stone-100"
                >
                  <Icon className="w-5 h-5 text-stone-500" />
                  <span className="text-[9px] uppercase tracking-widest text-stone-500 text-center font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-24 border-t border-stone-200 bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-stone-600">
          <span>© 2026 Atelier. All rights reserved.</span>
          <span>Instagram · Twitter</span>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
