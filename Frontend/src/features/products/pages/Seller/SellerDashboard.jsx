import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct";
import {
  Plus,
  ArrowUpRight,
  Package,
  Edit3,
  Trash2,
  Search,
  Eye,
} from "lucide-react";
import SellerNavigation from "../../../shared/components/SellerNavigation";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  console.log(sellerProducts);
  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-[#1a1a1a] md:pl-64">
      <SellerNavigation />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md pl-16 pr-6 py-4 md:px-6 flex items-center justify-end border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-[#3b557e] transition-colors cursor-pointer">
            <Search size={20} />
          </button>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#1a1a1a] group-hover:text-[#3b557e] transition-colors">
                Alex Morgan
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-6 pb-32 space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
              Inventory Overview
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Manage your crafted collection and track performance.
            </p>
          </div>
          <button
            onClick={() => navigate("/seller/create-product")}
            className="flex items-center justify-center gap-2 bg-[#3b557e] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#2d4363] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shadow-md shadow-[#3b557e]/20 group"
          >
            <Plus
              size={16}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            Add New Product
          </button>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Active Products",
              value: sellerProducts.length,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Total Orders",
              value: "156",
              color: "text-[#3b557e]",
              bg: "bg-[#3b557e]/10",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} p-6 rounded-3xl border border-white shadow-sm flex flex-col justify-center`}
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className={`text-4xl font-black ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <section className="space-y-6">
          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerProducts.map((product) => {
                const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0];
                const imageUrl = defaultVariant?.images?.[0]?.url || product.images?.[0]?.url || "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000";
                const price = defaultVariant?.price || product.price || { amount: 0, currency: "INR" };
                const currencySymbol = price.currency === "INR" ? "₹" : (price.currency === "USD" ? "$" : price.currency);
                const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? product.stock ?? 0;
                
                // Get unique attributes
                const colors = [...new Set(product.variants?.map(v => v.attributes?.color).filter(Boolean))];
                const sizes = [...new Set(product.variants?.map(v => v.attributes?.size).filter(Boolean))];
                
                const isLowStock = totalStock > 0 && totalStock < 5;
                const isOutOfStock = totalStock === 0;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Overlay Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        <span className="bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                          {product.brand || "Atelier"}
                        </span>
                        {product.category && (
                          <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider w-fit">
                            {product.category}
                          </span>
                        )}
                      </div>

                      {/* Status & Stock Badges */}
                      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                        <span className={`backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1.5 ${
                          product.status === "active" ? "bg-emerald-500/90 text-white" : "bg-slate-500/90 text-white"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-white ${product.status === "active" ? "animate-pulse" : ""}`} />
                          {product.status || "Active"}
                        </span>
                        
                        {isOutOfStock ? (
                          <span className="bg-rose-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="bg-amber-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                            Low Stock ({totalStock})
                          </span>
                        ) : (
                          <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Stock: {totalStock}
                          </span>
                        )}
                      </div>

                      {/* Hover Action Buttons */}
                      <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <button 
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="p-2.5 bg-white rounded-full text-slate-600 hover:text-[#3b557e] hover:scale-110 shadow-lg transition-all cursor-pointer"
                          title="View Product"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-2.5 bg-white rounded-full text-slate-600 hover:text-[#3b557e] hover:scale-110 shadow-lg transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          className="p-2.5 bg-white rounded-full text-rose-500 hover:bg-rose-50 hover:scale-110 shadow-lg transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Variant quick-view overlay */}
                      {product.variants?.length > 1 && (
                        <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-wider uppercase drop-shadow z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {product.variants.length} Variants Available
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow justify-between gap-4 bg-white">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-extrabold text-slate-800 text-base leading-snug line-clamp-1 group-hover:text-[#3b557e] transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-[#3b557e] font-black text-base whitespace-nowrap">
                              {currencySymbol} {price.amount?.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                            {product.description}
                          </p>
                        </div>

                        {/* Variants summary (Colors/Sizes swatches) */}
                        {(colors.length > 0 || sizes.length > 0) && (
                          <div className="pt-3 flex flex-wrap gap-x-4 gap-y-2 items-center text-[10px] border-t border-slate-50">
                            {colors.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 font-bold uppercase tracking-widest">Colors:</span>
                                <div className="flex flex-wrap gap-1">
                                  {colors.map((color, cIdx) => (
                                    <span 
                                      key={cIdx}
                                      className="px-2 py-0.5 bg-slate-50 text-slate-700 font-semibold border border-slate-100 rounded-md"
                                    >
                                      {color}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {sizes.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-slate-400 font-bold uppercase tracking-widest">Sizes:</span>
                                <div className="flex flex-wrap gap-0.5">
                                  {sizes.map((size, sIdx) => (
                                    <span 
                                      key={sIdx}
                                      className="w-5 h-5 bg-slate-50 text-slate-700 font-semibold border border-slate-100 rounded-md flex items-center justify-center text-[9px]"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer Info / Action */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-medium tracking-wide">
                          {product.subCategory && `In ${product.subCategory}`}
                        </span>
                        <button 
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="flex items-center gap-1 font-bold text-[#3b557e] uppercase tracking-widest hover:gap-2 transition-all cursor-pointer"
                        >
                          Details <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[32px] border border-dashed border-slate-200 space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <Package size={40} strokeWidth={1} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-[#1a1a1a]">
                  Your Atelier is Empty
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Start showcasing your craft to the world by creating your
                  first product listing.
                </p>
              </div>
              <button
                onClick={() => navigate("/seller/create-product")}
                className="bg-[#3b557e] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#3b557e]/20 hover:-translate-y-1 transition-all cursor-pointer"
              >
                Launch First Product
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
