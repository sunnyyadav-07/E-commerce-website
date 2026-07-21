import {
  Package,
  IndianRupee,
  Tag,
  User,
  Mail,
  Palette,
  Ruler,
  Barcode,
} from "lucide-react";

/* ── helpers ── */
const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS_STYLES = {
  pending:   { bg: "bg-amber-50",   text: "text-amber-600",   ring: "ring-amber-200"   },
  completed: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-200" },
  cancelled: { bg: "bg-red-50",     text: "text-red-500",     ring: "ring-red-200"     },
  shipped:   { bg: "bg-blue-50",    text: "text-blue-600",    ring: "ring-blue-200"    },
  delivered: { bg: "bg-teal-50",    text: "text-teal-600",    ring: "ring-teal-200"    },
};

/**
 * OrderCard — generic card for any order status.
 *
 * Props:
 *   order   — the order item object
 *   actions — optional JSX rendered in the footer (e.g. Accept/Reject buttons)
 *
 * Expected `order` shape:
 * {
 *   createdAt, orderId, itemId, quantity, price, itemStatus,
 *   buyerDetails: { name, email },
 *   productDetails: { productId, title, brand },
 *   variantDetails: { variantId, sku, images: [{ url }], attributes: { color, size } }
 * }
 */
const OrderCard = ({ order, actions }) => {
  const {
    createdAt,
    orderId,
    quantity,
    price,
    itemStatus,
    buyerDetails,
    productDetails,
    variantDetails,
  } = order;

  const totalPrice = price * quantity;
  const statusStyle = STATUS_STYLES[itemStatus] ?? STATUS_STYLES.pending;
  const thumbnail = variantDetails?.images?.[0]?.url;
  const { color, size } = variantDetails?.attributes ?? {};

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all duration-200 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-5 py-4 flex items-start justify-between gap-4 border-b border-stone-50">
        <div className="flex items-center gap-2.5">
          <div>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
              Order ID
            </p>
            <p className="text-[11px] font-black text-stone-700 tracking-wider font-mono mt-0.5">
              #{orderId.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Status badge */}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ring-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
          >
            {itemStatus}
          </span>

          {/* Date + time */}
          <div className="text-right">
            <p className="text-[11px] font-bold text-stone-700">{fmt(createdAt)}</p>
            <p className="text-[10px] text-stone-400 mt-0.5">{fmtTime(createdAt)}</p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4">

        {/* Product thumbnail */}
        {thumbnail && (
          <div className="shrink-0">
            <img
              src={thumbnail}
              alt={productDetails?.title}
              className="w-20 h-24 object-cover rounded-xl border border-stone-100 shadow-sm"
            />
          </div>
        )}

        {/* Product + variant info */}
        <div className="min-w-0 space-y-3">

          {/* Product title & brand */}
          <div>
            <p className="text-[13px] font-black text-stone-900 leading-snug">
              {productDetails?.title}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Tag className="w-3 h-3 text-stone-400" />
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                {productDetails?.brand}
              </p>
            </div>
          </div>

          {/* Variant attributes row */}
          <div className="flex flex-wrap gap-2">
            {color && (
              <div className="flex items-center gap-1 bg-stone-50 rounded-lg px-2 py-1 ring-1 ring-stone-100">
                <Palette className="w-3 h-3 text-stone-400" />
                <span className="text-[10px] font-semibold text-stone-600 capitalize">{color}</span>
              </div>
            )}
            {size && (
              <div className="flex items-center gap-1 bg-stone-50 rounded-lg px-2 py-1 ring-1 ring-stone-100">
                <Ruler className="w-3 h-3 text-stone-400" />
                <span className="text-[10px] font-semibold text-stone-600">Size {size}</span>
              </div>
            )}
            {variantDetails?.sku && (
              <div className="flex items-center gap-1 bg-stone-50 rounded-lg px-2 py-1 ring-1 ring-stone-100">
                <Barcode className="w-3 h-3 text-stone-400" />
                <span className="text-[10px] font-semibold text-stone-500 font-mono truncate max-w-[180px]">
                  {variantDetails.sku}
                </span>
              </div>
            )}
          </div>

          {/* Qty + price row */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Qty</p>
              <p className="text-[13px] font-black text-stone-800">{quantity}</p>
            </div>
            <div className="w-px h-6 bg-stone-100" />
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Unit price</p>
              <p className="text-[13px] font-black text-stone-800 flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />
                {price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Buyer info ── */}
      <div className="px-5 py-3 border-t border-stone-50 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#3b557e]/10 flex items-center justify-center shrink-0">
            <User className="w-3 h-3 text-[#3b557e]" />
          </div>
          <span className="text-[11px] font-bold text-stone-700">{buyerDetails?.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3 h-3 text-stone-300" />
          <span className="text-[11px] text-stone-400">{buyerDetails?.email}</span>
        </div>
      </div>

      {/* ── Footer — total + optional actions slot ── */}
      <div className="px-5 py-3 bg-stone-50/60 flex items-center justify-between border-t border-stone-50">
        <div className="flex items-center gap-1.5">
          <Package className="w-3 h-3 text-stone-400" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            {quantity} item{quantity !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-stone-800">
            <IndianRupee className="w-3 h-3" />
            <span className="text-xs font-black">{totalPrice.toLocaleString("en-IN")}</span>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
