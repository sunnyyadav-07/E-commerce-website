import useProduct from "../hooks/useProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Heart, ShoppingCart, Search, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const images = defaultVariant?.images || product.images || [];
  const price = defaultVariant?.price || product.price || { amount: 0, currency: "INR" };
  const currency = price.currency === "INR" ? "₹" : (price.currency === "USD" ? "$" : price.currency);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-stone-100 mb-4">
        {images.length > 0 ? (
          <>
            <img
              src={images[0].url}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                hovered && images.length > 1
                  ? "opacity-0 scale-105"
                  : "opacity-100 scale-100"
              }`}
            />
            {images.length > 1 && (
              <img
                src={images[1].url}
                alt={`${product.title} alt`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
            No Image
          </div>
        )}

        {/* Hover overlay: CTA */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/70 to-transparent transition-all duration-400 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="cursor-pointer w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-stone-100 transition-colors">
            Quick View
          </button>
        </div>

        {/* Wishlist icon */}
        <button
          className={`cursor-pointer absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <Heart className="w-4 h-4 text-stone-700" />
        </button>

        {/* Image count badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-full">
            {images.length} photos
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug">
            {product.title}
          </h3>
          <span className="font-bold text-stone-900 text-sm shrink-0">
            {currency}
            {price.amount?.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="pt-3">
          <button className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#3b557e] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md group/cart">
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/cart:-translate-y-0.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const products = useSelector((state) => state.product.allProducts);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F4] font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium text-stone-500">
            <a href="#" className="hover:text-stone-900 transition-colors">
              Collections
            </a>
            <a href="#" className="hover:text-stone-900 transition-colors">
              New Arrivals
            </a>
          </div>

          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-[0.15em] uppercase text-stone-900"
          >
            Atelier
          </a>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button className="cursor-pointer hidden md:flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-stone-500 hover:text-stone-900 transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
            <button className="cursor-pointer flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-stone-900 hover:text-stone-600 transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Bag (0)
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 mb-4">
            SS 2026 — New Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 leading-[1.05] tracking-tight mb-6">
            Crafted for
            <br />
            <span className="text-stone-400">the modern</span>
            <br />
            wardrobe.
          </h1>
          <p className="text-stone-500 text-base max-w-sm leading-relaxed mb-8">
            Timeless silhouettes in premium fabrics. Discover pieces built to
            last beyond the trend cycle.
          </p>
          <button className="cursor-pointer px-8 py-4 bg-[#3b557e] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#2d4363] transition-colors rounded-xl">
            Shop All
          </button>
        </div>
        <div className="hidden md:block flex-1 max-w-lg">
          <div className="aspect-3/4 rounded-3xl overflow-hidden bg-stone-200 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial fashion"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* ── Filter Strip ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10">
        <div className="flex items-center justify-between border-t border-b border-stone-200 py-4">
          <div className="flex gap-6">
            {["All", "Tops", "Bottoms"].map((f, i) => (
              <button
                key={f}
                className={`cursor-pointer text-xs uppercase tracking-widest font-semibold transition-colors ${
                  i === 0
                    ? "text-[#3b557e] border-b-2 border-[#3b557e] pb-0.5"
                    : "text-stone-400 hover:text-[#3b557e]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-400 hidden sm:block">
            {products?.length ?? 0} items
          </span>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        {!products || products.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-stone-200 border-t-stone-700 animate-spin" />
            <p className="text-xs uppercase tracking-widest text-stone-400">
              Loading collection…
            </p>
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
      <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-white font-bold tracking-widest uppercase text-sm mb-4">
              Atelier
            </h2>
            <p className="text-xs leading-relaxed text-stone-500">
              A curated edit of timeless wardrobe essentials. Crafted with
              intention, made to last.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">
              Help
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {["Shipping & Returns", "Size Guide", "Contact Us", "FAQ"].map(
                (l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between text-[10px] uppercase tracking-widest text-stone-600">
          <span>© 2026 Atelier</span>
          <span>Instagram · Twitter</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
