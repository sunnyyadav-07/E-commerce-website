import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MoreVertical,
  Layers,
  ArrowUpToLine,
  Package,
  DollarSign,
  Coins,
  SlidersHorizontal,
  Plus,
  Trash2,
  ChevronDown,
  CheckCircle2,
  ImagePlus,
  X,
} from "lucide-react";
import SellerNavigation from "../../../shared/components/SellerNavigation";
import useProduct from "../../hooks/useProduct";

// ── Design tokens (mirrors CreateParentProduct) ───────────────────────────────
const inputClass =
  "w-full bg-[#f3f4f6] border border-transparent rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b557e]/20 focus:border-[#3b557e]/30 focus:bg-white transition-all text-[#1a1a1a]";

const CURRENCIES = ["INR", "EUR", "GBP", "JPY", "USD"];
const MAX_IMAGES = 7;

// ── Reusable FormField ────────────────────────────────────────────────────────
const FormField = ({ label, icon: Icon, children, hint }) => (
  <div className="group space-y-2.5">
    <label className="flex items-center gap-2 text-[9px] font-bold text-gray-500 tracking-[0.25em] uppercase group-focus-within:text-[#3b557e] transition-colors">
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </label>
    {children}
    {hint && (
      <p className="text-[9px] text-gray-400 font-medium pl-1">{hint}</p>
    )}
  </div>
);

// ── Attribute input — attributes is a plain OBJECT { color: "Blue", size: "XL" }
const AttributeInput = ({ attributes, onChange }) => {
  const [attrKey, setAttrKey] = useState("");
  const [attrVal, setAttrVal] = useState("");

  const addAttr = () => {
    const k = attrKey.trim().toLowerCase();
    const v = attrVal.trim();
    if (!k || !v) return;
    onChange({ ...attributes, [k]: v }); // plain object spread
    setAttrKey("");
    setAttrVal("");
  };

  const removeAttr = (key) => {
    const next = { ...attributes };
    delete next[key];
    onChange(next);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAttr();
    }
  };

  const entries = Object.entries(attributes); // [["color","Blue"], ...]

  return (
    <div className="space-y-3">
      {entries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entries.map(([k, v]) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 bg-[#3b557e]/8 border border-[#3b557e]/20 text-[#3b557e] text-[11px] font-bold px-3 py-1.5 rounded-full"
            >
              <span className="text-[#3b557e]/60 capitalize">{k}:</span>
              {v}
              <button
                type="button"
                onClick={() => removeAttr(k)}
                className="ml-0.5 text-[#3b557e]/40 hover:text-red-400 transition-colors cursor-pointer"
              >
                <Trash2 size={11} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          id="variant-attr-key"
          type="text"
          placeholder="Key  (e.g., color)"
          value={attrKey}
          onChange={(e) => setAttrKey(e.target.value)}
          onKeyDown={onKeyDown}
          className={`${inputClass} flex-1`}
        />
        <input
          id="variant-attr-value"
          type="text"
          placeholder="Value  (e.g., Midnight Blue)"
          value={attrVal}
          onChange={(e) => setAttrVal(e.target.value)}
          onKeyDown={onKeyDown}
          className={`${inputClass} flex-1`}
        />
        <button
          type="button"
          onClick={addAttr}
          disabled={!attrKey.trim() || !attrVal.trim()}
          className="shrink-0 w-12 h-[54px] flex items-center justify-center bg-[#3b557e] text-white rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>
      <p className="text-[9px] text-gray-400 font-medium pl-1">
        Press Enter or + to add.
      </p>
    </div>
  );
};

// ── Image uploader (up to MAX_IMAGES files) — click OR drag-and-drop ─────────
const ImageUploader = ({ images, onChange }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0); // track nested drag-enter/leave
  const remaining = MAX_IMAGES - images.length;

  // ── Shared file processor ────────────────────────────────────────────────
  const processFiles = (fileList) => {
    if (remaining <= 0) return;
    const files = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);
    if (!files.length) return;
    const newEntries = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`,
    }));
    onChange([...images, ...newEntries]);
  };

  // ── Click handler ────────────────────────────────────────────────────────
  const handleFileInput = (e) => {
    processFiles(e.target.files || []);
    e.target.value = ""; // allow re-picking same file
  };

  // ── Drag-and-drop handlers ───────────────────────────────────────────────
  const onDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // required to allow drop
    e.dataTransfer.dropEffect = "copy";
  };

  const onDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // ── Remove ───────────────────────────────────────────────────────────────
  const removeImage = (id) => {
    const removed = images.find((img) => img.id === id);
    if (removed) URL.revokeObjectURL(removed.preview);
    onChange(images.filter((img) => img.id !== id));
  };

  // ── Drag-state classes ───────────────────────────────────────────────────
  const draggingClass = isDragging
    ? "border-[#3b557e] bg-[#3b557e]/8 scale-[1.01]"
    : "border-slate-300 hover:border-[#3b557e]/50 hover:bg-[#3b557e]/3";

  return (
    <div
      className="space-y-3"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* ── Thumbnail grid (shown once images exist) ── */}
      {images.length > 0 && (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {images.map((img, idx) => (
              <div key={img.id} className="relative group aspect-square">
                {idx === 0 && (
                  <span className="absolute top-1 left-1 z-10 bg-[#3b557e] text-white text-[7px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full pointer-events-none">
                    Cover
                  </span>
                )}
                <img
                  src={img.preview}
                  alt={`variant-img-${idx + 1}`}
                  className="w-full h-full object-cover rounded-xl border-2 border-slate-200 group-hover:border-[#3b557e]/40 transition-all"
                />
                {/* Delete button — always visible */}
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  title="Remove image"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            ))}

            {/* Add-more slot */}
            {remaining > 0 && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-[#3b557e]/50 hover:bg-[#3b557e]/5 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group"
              >
                <Plus
                  size={16}
                  className="text-slate-400 group-hover:text-[#3b557e] transition-colors"
                  strokeWidth={2}
                />
                <span className="text-[8px] font-bold text-slate-400 group-hover:text-[#3b557e] transition-colors">
                  Add
                </span>
              </button>
            )}
          </div>

          {/* Mini drop hint when images present */}
          <div
            className={`w-full py-2.5 rounded-xl border-2 border-dashed text-center transition-all duration-200 ${
              isDragging
                ? "border-[#3b557e] bg-[#3b557e]/8 text-[#3b557e]"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest">
              {isDragging
                ? "Drop to add photos"
                : "Or drag & drop more photos here"}
            </p>
          </div>
        </>
      )}

      {/* ── Full drop zone (shown when empty) ── */}
      {images.length === 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer ${draggingClass}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
              isDragging ? "bg-[#3b557e]/15" : "bg-slate-100"
            }`}
          >
            <ImagePlus
              size={22}
              className={`transition-colors ${isDragging ? "text-[#3b557e]" : "text-slate-400"}`}
              strokeWidth={1.5}
            />
          </div>
          <div className="text-center">
            <p
              className={`text-sm font-bold transition-colors ${isDragging ? "text-[#3b557e]" : "text-slate-500"}`}
            >
              {isDragging
                ? "Drop images here"
                : "Drag & drop or click to upload"}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              PNG, JPG, WEBP · up to {MAX_IMAGES} photos
            </p>
          </div>
        </div>
      )}

      {/* Counter */}
      <div className="flex items-center justify-between">
        <p className="text-[9px] text-gray-400 font-medium pl-1">
          First image becomes the cover photo.
        </p>
        <span
          className={`text-[9px] font-bold tabular-nums ${
            images.length >= MAX_IMAGES ? "text-amber-500" : "text-slate-400"
          }`}
        >
          {images.length}/{MAX_IMAGES}
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id="variant-images-input"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const CreateProductVariants = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { handleCreateProductVariant } = useProduct();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // attributes is a PLAIN OBJECT — not an array
  const [formData, setFormData] = useState({
    attributes: {},
    stock: "",
    price: "",
    currency: "INR",
    images: [], // [{ file, preview, id }]
  });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (attrObj) => {
    setFormData((prev) => ({ ...prev, attributes: attrObj }));
  };

  const handleImagesChange = (imgs) => {
    setFormData((prev) => ({ ...prev, images: imgs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) return;
    setIsSubmitting(true);
    try {
      // Use FormData to support multipart file upload
      const data = new FormData();
      data.append("attributes", JSON.stringify(formData.attributes));
      data.append("stock", formData.stock);
      data.append("priceAmount", formData.price);
      data.append("priceCurrency", formData.currency);
      formData.images.forEach((img) => data.append("images", img.file));

      const result = await handleCreateProductVariant(productId, data);
      if (result) setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const attrCount = Object.keys(formData.attributes).length;

  const fields = {
    attributes: attrCount > 0,
    stock: !!formData.stock,
    price: !!formData.price,
    currency: !!formData.currency,
    images: formData.images.length > 0,
  };
  const filledCount = Object.values(fields).filter(Boolean).length;
  const totalCount = Object.keys(fields).length;
  const progress = Math.round((filledCount / totalCount) * 100);

  const currencySymbol =
    formData.currency === "INR"
      ? "₹"
      : formData.currency === "EUR"
        ? "€"
        : formData.currency === "GBP"
          ? "£"
          : "$";

  const resetForm = () => {
    // Revoke any remaining object URLs
    formData.images.forEach((img) => URL.revokeObjectURL(img.preview));
    setSubmitted(false);
    setFormData({
      attributes: {},
      stock: "",
      price: "",
      currency: "INR",
      images: [],
    });
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-[#1a1a1a] md:pl-64">
        <SellerNavigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <CheckCircle2
              size={40}
              className="text-emerald-500"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-1">
              Variant Created!
            </h2>
            <p className="text-[11px] text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
              Your product variant has been saved successfully. Add another or
              return to your dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={resetForm}
              className="flex-1 py-3.5 rounded-xl border-2 border-[#3b557e] text-[#3b557e] text-[11px] font-bold tracking-widest uppercase hover:bg-[#3b557e]/5 transition-all cursor-pointer"
            >
              + Add Another
            </button>
            <button
              onClick={() => navigate("/seller/dashboard")}
              className="flex-1 py-3.5 rounded-xl bg-[#3b557e] text-white text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-[#3b557e]/20 hover:bg-[#2d4363] transition-all cursor-pointer"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-[#1a1a1a] md:pl-64">
      <SellerNavigation />

      {/* Sticky Header */}
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
            Add Variant
          </h1>
          <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
            Product variants · Step 2 of 2
          </p>
        </div>

        <button
          type="button"
          className="p-2 -mr-2 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-6 pb-32">
        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Completion
            </span>
            <span className="text-[9px] font-bold text-[#3b557e] uppercase tracking-widest">
              {filledCount}/{totalCount} Fields
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
              What is a Product Variant?
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              A variant represents a specific version of your product — e.g., a
              Blue / XL shirt. Set its attributes, stock level, and pricing
              below.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Attributes */}
          <FormField label="Attributes" icon={SlidersHorizontal}>
            <AttributeInput
              attributes={formData.attributes}
              onChange={handleAttributesChange}
            />
          </FormField>

          {/* Images */}
          <FormField
            label="Product Images"
            icon={ImagePlus}
            hint={`Upload up to ${MAX_IMAGES} images. The first image will be used as the cover photo.`}
          >
            <ImageUploader
              images={formData.images}
              onChange={handleImagesChange}
            />
          </FormField>

          {/* Stock */}
          <FormField
            label="Stock Quantity"
            icon={Package}
            hint="Enter the number of units available for this variant."
          >
            <input
              type="number"
              name="stock"
              id="variant-stock"
              min="0"
              step="1"
              placeholder="e.g., 50"
              value={formData.stock}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </FormField>

          {/* Price & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField label="Price" icon={DollarSign}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  name="price"
                  id="variant-price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-9`}
                />
              </div>
            </FormField>

            <FormField label="Currency" icon={Coins}>
              <div className="relative">
                <select
                  name="currency"
                  id="variant-currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown size={14} strokeWidth={2.5} />
                </div>
              </div>
            </FormField>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Preview card */}
          {(attrCount > 0 || formData.stock || formData.price) && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Variant Preview
              </p>
              {attrCount > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(formData.attributes).map(([k, v]) => (
                    <span
                      key={k}
                      className="text-[10px] font-bold bg-[#3b557e]/8 text-[#3b557e] px-2.5 py-1 rounded-full border border-[#3b557e]/15"
                    >
                      <span className="capitalize">{k}</span>: {v}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 pt-1">
                {formData.stock && (
                  <div className="flex items-center gap-1.5">
                    <Package size={11} className="text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600">
                      {formData.stock} units
                    </span>
                  </div>
                )}
                {formData.price && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={11} className="text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600">
                      {currencySymbol}
                      {formData.price} {formData.currency}
                    </span>
                  </div>
                )}
                {formData.images.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <ImagePlus size={11} className="text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600">
                      {formData.images.length} photo
                      {formData.images.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || attrCount === 0}
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
                    Save Variant
                  </span>
                </>
              )}
            </button>

            {attrCount === 0 && (
              <p className="text-[9px] text-center text-amber-500 font-bold tracking-wide">
                ⚠ Add at least one attribute to save this variant.
              </p>
            )}

            <p className="text-[9px] text-center text-gray-400 font-medium tracking-wide">
              You can add more variants after saving or manage them from your{" "}
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

export default CreateProductVariants;
