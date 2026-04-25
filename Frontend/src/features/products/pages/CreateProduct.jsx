import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  MoreVertical,
  Camera,
  Plus,
  LayoutDashboard,
  Inbox,
  ClipboardList,
  Settings,
  ArrowUpToLine,
  X,
} from "lucide-react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    currency: "INR",
    description: "",
  });

  const [images, setImages] = useState(Array(7).fill(null));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (index, file) => {
    if (file && file.type.startsWith("image/")) {
      const newImages = [...images];
      // Revoke old preview to avoid memory leaks
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setImages(newImages);
    }
  };

  const removeImage = (index, e) => {
    e.stopPropagation();
    const newImages = [...images];
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages[index] = null;
    setImages(newImages);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(index, file);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white px-6 py-4 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#3b557e] hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase">
          Create Product
        </h1>
        <button className="p-2 -mr-2 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-6 pb-32 space-y-10">
        {/* Form Fields */}
        <div className="space-y-8">
          {/* Product Title */}
          <div className="group">
            <label className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2.5 block group-focus-within:text-[#273853] transition-colors">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Hand-Woven Silk Scarf"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#f3f4f6] border-none rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
            />
          </div>

          {/* Price & Currency */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 group">
              <label className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2.5 block group-focus-within:text-[#273853] transition-colors">
                Price Amount
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[#f3f4f6] border-none rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
              />
            </div>
            <div className="w-full sm:w-1/3 group">
              <label className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2.5 block group-focus-within:text-[#273853] transition-colors">
                Currency
              </label>
              <div className="relative">
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a] appearance-none cursor-pointer"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="INR">INR</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="group">
            <label className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2.5 block group-focus-within:text-[#273853] transition-colors">
              Product Description
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="Describe the story, materials, and soul of your product..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#f3f4f6] border-none rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a] resize-none"
            />
          </div>
        </div>

        {/* Product Imagery Section */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-extrabold text-[#1a1a1a]">
              Product Imagery
            </h2>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-xs">
              Upload up to 7 high-resolution images. Show your craft from every
              angle.
            </p>
          </div>

          <div className="space-y-4">
            {/* Main Visual Slot */}
            <div
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, 0)}
              onClick={() => document.getElementById("file-0").click()}
              className={`relative aspect-square w-full bg-[#f3f4f6] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center group cursor-pointer transition-all overflow-hidden ${
                images[0]
                  ? "border-solid border-[#3b557e]"
                  : "border-gray-300 hover:border-[#3b557e]/30 hover:bg-[#f3f4f6]/50"
              }`}
            >
              {images[0] ? (
                <div className="relative w-full h-full group">
                  <img
                    src={images[0].preview}
                    alt="Main Visual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => removeImage(0, e)}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-[#3b557e] transition-colors">
                  <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                    <Camera size={28} strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase block">
                      Main Visual
                    </span>
                    <span className="text-[8px] opacity-80 mt-1 block font-medium">
                      Drop image here or click to upload
                    </span>
                  </div>
                </div>
              )}
              <input
                id="file-0"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(0, e.target.files[0])}
              />
            </div>

            {/* Grid of Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => {
                const idx = i + 1;
                return (
                  <div
                    key={idx}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, idx)}
                    onClick={() =>
                      document.getElementById(`file-${idx}`).click()
                    }
                    className={`relative aspect-square bg-[#f3f4f6] rounded-2xl flex items-center justify-center group cursor-pointer transition-all border ${
                      images[idx]
                        ? "border-[#3b557e]"
                        : "border-transparent hover:border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {images[idx] ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={images[idx].preview}
                          alt={`Visual ${idx}`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <button
                            onClick={(e) => removeImage(idx, e)}
                            className="p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-white/50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Plus
                          size={20}
                          className="text-gray-400 group-hover:text-[#3b557e] group-hover:scale-110 transition-all"
                        />
                      </div>
                    )}
                    <input
                      id={`file-${idx}`}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(idx, e.target.files[0])
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="space-y-4 pt-4">
          <button className="w-full bg-[#3b557e] text-white flex items-center justify-center gap-3 py-4 rounded-xl shadow-lg shadow-[#3b557e]/20 hover:bg-[#2d4363] hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group">
            <ArrowUpToLine size={18} className="group-hover:animate-bounce" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
              Publish to Atelier
            </span>
          </button>
          <p className="text-[9px] text-center text-gray-500 font-medium tracking-wide">
            By publishing, you agree to the{" "}
            <span className="text-[#3b557e] cursor-pointer hover:underline">
              Atelier Merchant Terms
            </span>
            .
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50">
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer">
          <LayoutDashboard size={20} />
          <span className="text-[8px] font-bold tracking-tighter uppercase">
            Dashboard
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#3b557e] transition-colors cursor-pointer relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#3b557e] rounded-b-full"></div>
          <Inbox size={20} />
          <span className="text-[8px] font-bold tracking-tighter uppercase">
            Inventory
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer">
          <ClipboardList size={20} />
          <span className="text-[8px] font-bold tracking-tighter uppercase">
            Orders
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer">
          <Settings size={20} />
          <span className="text-[8px] font-bold tracking-tighter uppercase">
            Settings
          </span>
        </button>
      </nav>
    </div>
  );
};

export default CreateProduct;
