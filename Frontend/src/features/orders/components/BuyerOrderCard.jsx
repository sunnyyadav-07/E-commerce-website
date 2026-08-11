import { useNavigate } from "react-router";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  ShoppingBag,
  CalendarDays,
  ChevronRight,
  Package,
} from "lucide-react";
import { useOrder } from "../hooks/useOrder";
import { fmtDate, fmtTime } from "../../shared/utils/dateTime";

/* ── Status config ─────────────────────────────────────── */
const STATUS = {
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  processing: {
    label: "Processing",
    icon: RotateCcw,
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    text: "text-violet-600",
    dot: "bg-violet-400",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    text: "text-blue-600",
    dot: "bg-blue-400",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    bg: "bg-teal-50",
    ring: "ring-teal-200",
    text: "text-teal-600",
    dot: "bg-teal-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-red-50",
    ring: "ring-red-200",
    text: "text-red-500",
    dot: "bg-red-400",
  },
};

/* ── Status Badge ──────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS[status?.toLowerCase()] ?? STATUS.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
};

/* ── Format helpers ────────────────────────────────────── */

/**
 * BuyerOrderCard
 *
 * Props:
 *  order — flat item shape from API:
 *  { orderId, itemId, itemStatus, price, quantity, createdAt,
 *    productDetails: { productId, title },
 *    variantDetails: { variantId, sku, thumbnail: { url } } }
 */
const BuyerOrderCard = ({ order }) => {
  const navigate = useNavigate();
  const { handleCancelOrderByBuyer } = useOrder();

  const {
    orderId,
    itemId,
    itemStatus,
    price,
    quantity,
    createdAt,
    productDetails = {},
    variantDetails = {},
  } = order;

  const thumbnailUrl = variantDetails.thumbnail?.url;
  const productTitle = productDetails.title;
  const productId = productDetails.productId;
  const sku = variantDetails.sku;
  const canCancel = ["pending", "processing"].includes(
    itemStatus?.toLowerCase()
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all duration-200 overflow-hidden group">
      {/* ── Header ── */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-4 border-b border-stone-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-[#3b557e]/10 transition-colors duration-200">
            <ShoppingBag className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#3b557e] transition-colors duration-200" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <CalendarDays className="w-3 h-3" />
            <span>{fmtDate(createdAt)}</span>
            <span className="w-px h-3 bg-stone-200" />
            <Clock className="w-3 h-3" />
            <span>{fmtTime(createdAt)}</span>
          </div>
        </div>

        <StatusBadge status={itemStatus} />
      </div>

      {/* ── Item Row ── */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 rounded-xl p-1 -mx-1">
          {/* Thumbnail */}
          <div
            onClick={() => productId && navigate(`/product/${productId}`)}
            className={`w-12 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-100 ${
              productId ? "cursor-pointer" : ""
            }`}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={productTitle}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-4 h-4 text-stone-300" />
              </div>
            )}
          </div>

          {/* Info */}
          <div
            onClick={() => productId && navigate(`/product/${productId}`)}
            className={`flex-1 min-w-0 ${
              productId ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
            }`}
          >
            <p className="text-[13px] font-bold text-stone-900 truncate leading-snug">
              {productTitle}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Qty: {quantity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 py-3 bg-stone-50/60 border-t border-stone-50 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-sm font-black text-stone-900">
          ₹{price?.toLocaleString("en-IN")}
        </span>

        <div className="flex items-center gap-2">
          {/* Cancel button */}
          {canCancel && (
            <button
              onClick={() => handleCancelOrderByBuyer(orderId, itemId)}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-red-50 text-red-500 ring-1 ring-red-200 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancel
            </button>
          )}

          {/* Return button — delivered only */}
          {itemStatus?.toLowerCase() === "delivered" && (
            <button className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 ring-1 ring-orange-200 hover:bg-orange-500 hover:text-white transition-all duration-200">
              <RotateCcw className="w-3.5 h-3.5" />
              Return
            </button>
          )}

          <button
            onClick={() => navigate(`/order/${orderId}`)}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-[#3b557e]/10 text-[#3b557e] ring-1 ring-[#3b557e]/20 hover:bg-[#3b557e] hover:text-white transition-all duration-200"
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrderCard;
