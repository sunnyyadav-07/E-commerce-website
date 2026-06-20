import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
  Save,
  Tag,
  AlignLeft,
  DollarSign,
  Package,
  Palette,
  Ruler,
  Pencil,
  Layers,
} from "lucide-react";
import SellerNavigation from "../../../shared/components/SellerNavigation";
import {
  inputClass,
  FormField,
  SectionLabel,
  StatusBanner,
  ColorPicker,
  SizePicker,
  SubmitButton,
} from "../../../shared/components/FormUI";
import useProduct from "../../hooks/useProduct";

/* ──────────────────────────────────────────────────────────────────────────── */

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");

  const { handleGetProductDetails, handleUpdateProduct } = useProduct();

  /* timer ref — cleared on unmount to prevent memory leak */
  const navTimerRef = useRef(null);
  useEffect(() => {
    return () => clearTimeout(navTimerRef.current);
  }, []);

  /* ── Fetched data ──────────────────────────────────────────────────────── */
  const [fetchedProduct, setFetchedProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await handleGetProductDetails(productId);
      if (data) setFetchedProduct(data);
    })();
  }, [productId]);

  /* Specific variant being edited */
  const variant = fetchedProduct?.variants?.find(
    (v) => v._id.toString() === variantId,
  );

  /* ── Form state ────────────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    title: "",
    description: "",
    color: "",
    size: "",
    stock: "",
    price: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  /* Seed form once variant data arrives */
  useEffect(() => {
    if (!fetchedProduct || !variant) return;
    setForm({
      title: fetchedProduct.title ?? "",
      description: fetchedProduct.description ?? "",
      color: variant.attributes?.color ?? "",
      size: variant.attributes?.size ?? "",
      stock: variant.stock ?? "",
      price: variant.price?.amount ?? "",
    });
  }, [fetchedProduct, variant]);

  /* ── Handlers ──────────────────────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setPicker = (field) => (val) => {
    setIsDirty(true);
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  /* ── Submit ────────────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", text: "" });
    try {
      const updatedData = await handleUpdateProduct(productId, variantId, form);
      setStatus({ type: "success", text: "Product updated successfully!" });
      setIsDirty(false);
      navTimerRef.current = setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setStatus({
        type: "error",
        text: err?.response?.data?.message ?? "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Loading guard ─────────────────────────────────────────────────────── */
  if (!fetchedProduct) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans md:pl-64">
        <SellerNavigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#3b557e] animate-spin" />
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Loading product…
          </p>
        </div>
      </div>
    );
  }

  /* ── Variant-not-found guard ───────────────────────────────────────────── */
  if (!variant) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans md:pl-64">
        <SellerNavigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
            <Layers size={40} strokeWidth={1} />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-[#1a1a1a]">
              Variant not found
            </h2>
            <p className="text-sm text-slate-500">Go back and try again.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-[#3b557e] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#2d4363] transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  /* Thumbnail from the specific variant being edited */
  const imageUrl = variant.images?.[0]?.url;

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-[#1a1a1a] md:pl-64">
      <SellerNavigation />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white pl-16 pr-6 py-4 md:px-6 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#3b557e] hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <h1 className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase flex items-center gap-2">
            <Pencil size={12} className="text-[#3b557e]" />
            Edit Product
          </h1>
          <p className="text-[9px] font-medium uppercase tracking-wider">
            {isDirty ? (
              <span className="text-amber-500 font-bold">
                ● Unsaved changes
              </span>
            ) : (
              <span className="text-slate-400">Up to date</span>
            )}
          </p>
        </div>

        <span className="text-[9px] font-black px-3 py-1.5 rounded-full bg-[#3b557e]/10 text-[#3b557e] uppercase tracking-widest">
          {fetchedProduct.variants?.length ?? 0} variant
          {(fetchedProduct.variants?.length ?? 0) !== 1 ? "s" : ""}
        </span>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto p-6 pb-32 space-y-8">
        {/* Product snapshot card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex">
          <div className="w-28 shrink-0 relative overflow-hidden bg-slate-100">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={fetchedProduct.title}
                className="w-full h-full object-cover"
              />
            )}
            <span
              className={`absolute top-2 left-2 w-2 h-2 rounded-full shadow ${
                fetchedProduct.status === "active"
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-slate-400"
              }`}
            />
          </div>
          <div className="flex-1 p-5 space-y-2">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Editing
            </p>
            <h2 className="text-base font-extrabold text-slate-800 line-clamp-1">
              {fetchedProduct.title}
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {variant.attributes?.color && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  <Palette size={9} /> {variant.attributes.color}
                </span>
              )}
              {variant.attributes?.size && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  <Ruler size={9} /> {variant.attributes.size}
                </span>
              )}
              {variant.price && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#3b557e] bg-[#3b557e]/8 border border-[#3b557e]/15 px-2.5 py-1 rounded-full">
                  ₹{variant.price.amount?.toLocaleString()}
                </span>
              )}
              {variant.stock !== undefined && (
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    variant.stock === 0
                      ? "bg-rose-50 border-rose-100 text-rose-600"
                      : variant.stock < 5
                        ? "bg-amber-50 border-amber-100 text-amber-600"
                        : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  <Package size={9} /> {variant.stock} in stock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status banner */}
        <StatusBanner type={status.type} message={status.text} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionLabel>Base Details</SectionLabel>

          {/* Title */}
          <FormField
            label="Product Title"
            icon={Tag}
            hint="Appears in search results and on the product page."
          >
            <input
              type="text"
              name="title"
              id="edit-title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Hand-Woven Silk Scarf"
              required
              className={inputClass}
            />
          </FormField>

          {/* Description */}
          <FormField label="Description" icon={AlignLeft}>
            <textarea
              name="description"
              id="edit-description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe materials, fit, and the story of this product…"
              required
              className={`${inputClass} resize-none`}
            />
            <div className="flex justify-between items-center pl-1">
              <p className="text-[9px] text-gray-400 font-medium">
                Aim for 80+ characters for better discoverability.
              </p>
              <span
                className={`text-[9px] font-bold tabular-nums ${
                  form.description.length < 80
                    ? "text-amber-400"
                    : "text-emerald-500"
                }`}
              >
                {form.description.length} chars
              </span>
            </div>
          </FormField>

          <SectionLabel>Variant Details</SectionLabel>

          {/* Color */}
          <FormField
            label="Color"
            icon={Palette}
            hint="Select a preset or type a custom colour name."
          >
            <ColorPicker value={form.color} onChange={setPicker("color")} />
          </FormField>

          {/* Size */}
          <FormField
            label="Size"
            icon={Ruler}
            hint="Select a standard size or type a custom one."
          >
            <SizePicker value={form.size} onChange={setPicker("size")} />
          </FormField>

          {/* Stock */}
          <FormField
            label="Stock Quantity"
            icon={Package}
            hint="Units available for this variant."
          >
            <input
              type="number"
              name="stock"
              id="edit-stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
              className={inputClass}
            />
          </FormField>

          {/* Price */}
          <FormField
            label="Price"
            icon={DollarSign}
            hint="Base selling price for this variant."
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                name="price"
                id="edit-price"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
                className={`${inputClass} pl-9`}
              />
            </div>
          </FormField>

          {/* Live preview */}
          {(form.color ||
            form.size ||
            form.stock !== "" ||
            form.price !== "") && (
            <div className="p-4 bg-[#3b557e]/5 border border-[#3b557e]/10 rounded-2xl space-y-2">
              <p className="text-[9px] font-bold text-[#3b557e] uppercase tracking-widest">
                Preview
              </p>
              <div className="flex flex-wrap gap-2">
                {form.color && <Chip>🎨 {form.color}</Chip>}
                {form.size && <Chip>📐 {form.size}</Chip>}
                {form.stock !== "" && <Chip>📦 {form.stock} units</Chip>}
                {form.price !== "" && (
                  <Chip accent>₹ {Number(form.price).toLocaleString()}</Chip>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100" />

          {/* Submit */}
          <div className="space-y-3 pt-2">
            <SubmitButton
              isLoading={isSubmitting}
              disabled={!isDirty}
              loadingText="Saving…"
            >
              <Save
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                {isDirty ? "Save Changes" : "No Changes to Save"}
              </span>
            </SubmitButton>
          </div>
        </form>
      </main>
    </div>
  );
};

/* Tiny internal chip — not exported, only used in this file */
const Chip = ({ accent, children }) => (
  <span
    className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
      accent
        ? "bg-white border-[#3b557e]/20 text-[#3b557e]"
        : "bg-white border-slate-200 text-slate-700"
    }`}
  >
    {children}
  </span>
);

export default EditProduct;
