import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  MoreVertical,
  Layers,
  ArrowUpToLine,
  Tag,
  AlignLeft,
  BadgeCheck,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import SellerNavigation from "../../../shared/components/SellerNavigation";
import useProduct from "../../hooks/useProduct";
const CATEGORIES = ["Men's Clothing", "Women's Clothing"];

const SUBCATEGORIES = {
  "Men's Clothing": ["Top", "Bottom"],
  "Women's Clothing": ["Top", "Bottom"],
};

const FormField = ({ label, icon: Icon, children }) => (
  <div className="group space-y-2.5">
    <label className="flex items-center gap-2 text-[9px] font-bold text-gray-500 tracking-[0.25em] uppercase group-focus-within:text-[#3b557e] transition-colors">
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full bg-[#f3f4f6] border border-transparent rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b557e]/20 focus:border-[#3b557e]/30 focus:bg-white transition-all text-[#1a1a1a]";

const CreateParentProduct = () => {
  const navigate = useNavigate();
  const { handleCreateParentProduct } = useProduct();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset subcategory whenever category changes
    if (name === "category") {
      setFormData((prev) => ({ ...prev, category: value, subCategory: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleCreateParentProduct(formData);
    if (res) {
      navigate(`/seller/create-product/:${res._id}/variant`);
    }
    console.log(res);
  };

  const filledFields = Object.values(formData).filter(Boolean).length;
  const totalFields = Object.keys(formData).length;
  const progress = Math.round((filledFields / totalFields) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-[#1a1a1a] md:pl-64">
      <SellerNavigation />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-white pl-16 pr-6 py-4 md:px-6 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#3b557e] hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <h1 className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase">
            New Parent Product
          </h1>
          <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
            Base listing · Step 1 of 2
          </p>
        </div>

        <button
          type="button"
          className="p-2 -mr-2 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <MoreVertical size={20} />
        </button>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-6 pb-32">
        {/* Progress indicator */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Completion
            </span>
            <span className="text-[9px] font-bold text-[#3b557e] uppercase tracking-widest">
              {filledFields}/{totalFields} Fields
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3b557e] to-[#5b7fae] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Intro card */}
        <div className="mb-8 p-5 bg-[#3b557e]/5 border border-[#3b557e]/10 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-[#3b557e]/10 rounded-xl flex items-center justify-center shrink-0">
            <Layers size={20} className="text-[#3b557e]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#3b557e] mb-1">
              What is a Parent Product?
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              A parent product is the base listing that groups all variants
              (sizes, colours, etc.) under one identity. You'll add variants in
              the next step.
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Title */}
          <FormField label="Product Title" icon={Tag}>
            <input
              type="text"
              name="title"
              id="parent-product-title"
              placeholder="e.g., Hand-Woven Silk Scarf"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <p className="text-[9px] text-gray-400 font-medium pl-1">
              Keep it concise and descriptive — this appears in search results.
            </p>
          </FormField>

          {/* Brand & Category — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Brand */}
            <FormField label="Brand" icon={BadgeCheck}>
              <input
                type="text"
                name="brand"
                id="parent-product-brand"
                placeholder="e.g., Atelier Studio"
                value={formData.brand}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </FormField>

            {/* Category */}
            <FormField label="Category" icon={LayoutGrid}>
              <div className="relative">
                <select
                  name="category"
                  id="parent-product-category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown size={14} strokeWidth={2.5} />
                </div>
              </div>
            </FormField>
          </div>

          {/* Subcategory — shown only after a category is selected */}
          {formData.category && (
            <FormField label="Subcategory" icon={LayoutGrid}>
              <div className="flex gap-3">
                {SUBCATEGORIES[formData.category].map((sub) => (
                  <label
                    key={sub}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-bold tracking-wide select-none ${
                      formData.subCategory === sub
                        ? "border-[#3b557e] bg-[#3b557e]/5 text-[#3b557e]"
                        : "border-slate-200 bg-[#f3f4f6] text-slate-500 hover:border-[#3b557e]/30 hover:text-[#3b557e]/70"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subCategory"
                      value={sub}
                      checked={formData.subCategory === sub}
                      onChange={handleChange}
                      className="appearance-none"
                      required
                    />
                    {sub === "Top" ? "👕" : "👖"} {sub}
                  </label>
                ))}
              </div>
            </FormField>
          )}

          {/* Description */}
          <FormField label="Product Description" icon={AlignLeft}>
            <textarea
              name="description"
              id="parent-product-description"
              rows={6}
              placeholder="Describe the story, materials, and craftsmanship of your product…"
              value={formData.description}
              onChange={handleChange}
              required
              className={`${inputClass} resize-none`}
            />
            <div className="flex justify-between items-center pl-1">
              <p className="text-[9px] text-gray-400 font-medium">
                Aim for at least 80 characters for better discoverability.
              </p>
              <span
                className={`text-[9px] font-bold tabular-nums ${
                  formData.description.length < 80
                    ? "text-amber-400"
                    : "text-emerald-500"
                }`}
              >
                {formData.description.length} chars
              </span>
            </div>
          </FormField>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Submit */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3b557e] text-white flex items-center justify-center gap-3 py-4 rounded-xl shadow-lg shadow-[#3b557e]/20 hover:bg-[#2d4363] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer group disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                    Saving…
                  </span>
                </>
              ) : (
                <>
                  <ArrowUpToLine
                    size={18}
                    className="group-hover:animate-bounce"
                  />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                    Save & Continue to Variants
                  </span>
                </>
              )}
            </button>

            <p className="text-[9px] text-center text-gray-400 font-medium tracking-wide">
              You can always edit these details later from your{" "}
              <span
                className="text-[#3b557e] cursor-pointer hover:underline"
                onClick={() => navigate("/seller/dashboard")}
              >
                Inventory
              </span>
              .
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateParentProduct;
