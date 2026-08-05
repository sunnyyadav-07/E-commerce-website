import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct";
import SellerNavigation from "../../components/SellerNavigation";
import DashboardHeader from "../../components/seller/DashboardHeader";
import InventoryHeader from "../../components/seller/InventoryHeader";
import DashboardStats from "../../components/seller/DashboardStats";
import DraftsSection from "../../components/seller/DraftsSection";
import LiveProductsSection from "../../components/seller/LiveProductsSection";

const SellerDashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const drafts = sellerProducts.filter(
    (p) => !p.variants || p.variants.length === 0,
  );
  const liveProducts = sellerProducts.filter(
    (p) => p.variants && p.variants.length > 0,
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-[#1a1a1a] md:pl-64">
      <SellerNavigation />
      <DashboardHeader />

      <main className="flex-1 w-full max-w-5xl mx-auto p-6 pb-32 space-y-8">
        <InventoryHeader />
        <DashboardStats liveCount={liveProducts.length} draftCount={drafts.length} />
        <DraftsSection drafts={drafts} />
        <LiveProductsSection liveProducts={liveProducts} draftsExist={drafts.length > 0} />
      </main>
    </div>
  );
};

export default SellerDashboard;
