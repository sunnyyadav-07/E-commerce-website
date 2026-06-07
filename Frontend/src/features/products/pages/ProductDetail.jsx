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
  Tag,
  Layers,
} from "lucide-react";
import { useCart } from "../../addToCart/hooks/useCart";

/* ─── Component ──────────────────────────────────────────── */
const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const { handleAddToCart } = useCart();
  const loading = useSelector((state) => state.product.loading);
  const user = useSelector((state) => state.auth.user);
  const isSeller = user?.role === "seller";
  const { handleGetProductDetails } = useProduct();

  useEffect(() => {
    (async () => {
      const data = await handleGetProductDetails(productId);
      if (data) {
        setProduct(data);
        const def =
          data.variants?.find((v) => v.isDefault) ?? data.variants?.[0];
        setSelectedVariantId(def?._id ?? null);
        setActiveImg(0);
      }
    })();
  }, [productId]);
  function addToCartHandle(variantId) {
    const data = {
      productId,
      variantId,
    };
    handleAddToCart(data);
  }
  /* ── derived values from selected variant ── */
  const selectedVariant =
    product?.variants?.find((v) => v._id === selectedVariantId) ??
    product?.variants?.[0];

  const images = selectedVariant?.images ?? [];
  const price = selectedVariant?.price;
  const stock = selectedVariant?.stock ?? 0;
  const attributes = selectedVariant?.attributes ?? {};

  const currencySymbol =
    price?.currency === "INR"
      ? "₹"
      : price?.currency === "USD"
        ? "$"
        : price?.currency;

  /* ── unique colours list  ── */
  const colorVariants = product?.variants;
  /* ─── Loading ─────────────────────────────────────────── */
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

  /* ─── Not Found ───────────────────────────────────────── */
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

  /* ─── Main render ─────────────────────────────────────── */
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

          {user?.role === "buyer" && (
            <button
              onClick={() => navigate("/my-cart")}
              className="cursor-pointer flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-stone-900 hover:text-stone-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Bag (0)
            </button>
          )}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* ── LEFT: Image Gallery ── */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-150 shrink-0 pb-2 md:pb-0">
                {images.map((img, i) => (
                  <button
                    key={img._id || i}
                    onClick={() => setActiveImg(i)}
                    className={`cursor-pointer shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i
                        ? "border-stone-900 opacity-100 scale-105"
                        : "border-transparent opacity-55 hover:opacity-100"
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
            <div className="relative flex-1 aspect-3/4 rounded-3xl overflow-hidden bg-stone-100 shadow-xl">
              <img
                key={`${selectedVariantId}-${activeImg}`}
                src={images?.[activeImg]?.url}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Stock ribbon */}
              {stock <= 5 && stock > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  Only {stock} left
                </span>
              )}
              {stock === 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  Out of Stock
                </span>
              )}

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  // prev
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
                  // nex
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
                        className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${
                          activeImg === i ? "bg-white w-4" : "bg-white/50 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col lg:sticky lg:top-24 gap-7">
            {/* Brand + collection badge */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.brand && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                  <Tag className="w-3 h-3" />
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                  <Layers className="w-3 h-3" />
                  {product.category}
                  {product.subCategory ? ` · ${product.subCategory}` : ""}
                </span>
              )}
            </div>

            {/* Title + wishlist */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              {!isSeller && (
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`cursor-pointer shrink-0 mt-1 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    wishlisted
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-red-500" : ""}`}
                  />
                </button>
              )}
            </div>

            {/* Price + stock indicator */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">
                {currencySymbol}
                {price.amount?.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-stone-400 uppercase tracking-widest">
                {price.currency}
              </span>
              <span
                className={`ml-auto text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  stock > 5
                    ? "bg-emerald-50 text-emerald-600"
                    : stock > 0
                      ? "bg-amber-50 text-amber-600"
                      : "bg-red-50 text-red-500"
                }`}
              >
                {stock > 0 ? `${stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="border-t border-stone-200" />

            {/* ── Colour selector ── */}
            {colorVariants.length > 1 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">
                  Colour —{" "}
                  <span className="text-stone-600 font-semibold capitalize">
                    {attributes.color ?? ""}
                  </span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {colorVariants.map((v) => {
                    const isSelected = v._id === selectedVariantId;
                    const colorName = v.attributes?.color ?? "";
                    return (
                      <button
                        key={v._id}
                        onClick={() => {
                          setSelectedVariantId(v._id);
                          setActiveImg(0);
                        }}
                        title={colorName}
                        className={`cursor-pointer relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-stone-900 scale-110 shadow-md"
                            : "border-stone-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: colorName }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-stone-900 ring-offset-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Size selector ── */}
            {(() => {
              const sizes = [
                ...new Set(
                  (product?.variants ?? [])
                    .filter(
                      (v) =>
                        v.attributes?.color?.toLowerCase() ===
                        selectedVariant?.attributes?.color?.toLowerCase(),
                    )
                    .map((v) => v.attributes?.size)
                    .filter(Boolean),
                ),
              ];
              if (!sizes.length) return null;
              return (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">
                    Size —{" "}
                    <span className="text-stone-600 font-semibold">
                      {attributes.size ?? ""}
                    </span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => {
                      const matchingVariant = (product?.variants ?? []).find(
                        (v) =>
                          v.attributes?.size === size &&
                          v.attributes?.color?.toLowerCase() ===
                            selectedVariant?.attributes?.color?.toLowerCase(),
                      );
                      const isSelected =
                        matchingVariant?._id === selectedVariantId;
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (matchingVariant) {
                              setSelectedVariantId(matchingVariant._id);
                              setActiveImg(0);
                            }
                          }}
                          className={`cursor-pointer min-w-11 px-4 py-2 rounded-xl text-sm font-semibold uppercase tracking-wider border-2 transition-all duration-200 ${
                            isSelected
                              ? "border-stone-900 bg-stone-900 text-white"
                              : "border-stone-200 text-stone-600 hover:border-stone-400"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="border-t border-stone-200" />

            {/* CTA Buttons */}
            {isSeller ? (
              <div className="flex items-start gap-3 p-4 bg-[#3b557e]/5 border border-[#3b557e]/15 rounded-2xl">
                <div className="w-8 h-8 bg-[#3b557e]/10 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-[#3b557e]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3b557e] mb-0.5">
                    Seller View
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Purchase actions are disabled in seller mode. Switch to a
                    buyer account to shop.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <button
                  disabled={stock === 0}
                  onClick={() => {
                    addToCartHandle(selectedVariantId);
                  }}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-[#3b557e] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  disabled={stock === 0}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-stone-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Zap className="w-5 h-5" />
                  Buy Now
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
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

            <div className="border-t border-stone-200" />

            {/* Details list */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">
                Details
              </h3>
              <ul className="space-y-2 text-sm text-stone-600">
                {product.brand && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                    Brand:{" "}
                    <span className="font-semibold capitalize">
                      {product.brand}
                    </span>
                  </li>
                )}
                {product.category && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                    Category:{" "}
                    <span className="font-semibold">
                      {product.category}
                      {product.subCategory ? ` / ${product.subCategory}` : ""}
                    </span>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  Premium quality fabric
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  Free shipping on orders above ₹2000
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                  Easy 30-day returns
                </li>
              </ul>
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
