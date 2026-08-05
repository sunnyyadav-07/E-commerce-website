import React from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

const InventoryHeader = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default InventoryHeader;
