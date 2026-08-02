import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ShoppingBag,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import { useOrder } from "../../hooks/useOrder";

/* ── Status config ───────────────────────────────────────────── */
const STATUS = {
  pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    text: "text-emerald-600",
    dot: "bg-emerald-400",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-400",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    bg: "bg-teal-50",
    ring: "ring-teal-100",
    text: "text-teal-600",
    dot: "bg-teal-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bg: "bg-red-50",
    ring: "ring-red-100",
    text: "text-red-500",
    dot: "bg-red-400",
  },
};

/* ── Status Badge ────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS[status] ?? STATUS.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
};

/* ── Section card wrapper ────────────────────────────────────── */
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl border border-stone-100 shadow-sm ${className}`}
  >
    {children}
  </div>
);

/* ── Section heading ─────────────────────────────────────────── */
const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-xl bg-stone-100 flex items-center justify-center">
      <Icon className="w-3.5 h-3.5 text-stone-500" />
    </div>
    <h3 className="text-xs font-black uppercase tracking-[0.18em] text-stone-700">
      {title}
    </h3>
  </div>
);

/* ── Skeleton Loader ─────────────────────────────────────────── */
const DetailSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {/* header */}
    <div className="h-8 w-40 bg-stone-200 rounded-full" />
    <div className="h-4 w-56 bg-stone-100 rounded-full" />
    {/* item card */}
    <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
      <div className="h-3 w-24 bg-stone-200 rounded-full" />
      <div className="flex gap-4">
        <div className="w-24 h-28 bg-stone-100 rounded-xl shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-3/4 bg-stone-200 rounded-full" />
          <div className="h-3 w-1/2 bg-stone-100 rounded-full" />
          <div className="h-3 w-2/3 bg-stone-100 rounded-full" />
        </div>
      </div>
    </div>
    {/* address + summary */}
    {[1, 2].map((n) => (
      <div
        key={n}
        className="bg-white rounded-2xl border border-stone-100 p-5 space-y-3"
      >
        <div className="h-3 w-28 bg-stone-200 rounded-full" />
        <div className="h-3 w-full bg-stone-100 rounded-full" />
        <div className="h-3 w-2/3 bg-stone-100 rounded-full" />
      </div>
    ))}
  </div>
);

/* ── Order Item Card ─────────────────────────────────────────── */
const OrderItemCard = ({ item }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images = item.images ?? [];

  return (
    <div className="flex gap-4">
      {/* Image */}
      <div className="relative w-24 h-28 rounded-xl overflow-hidden shrink-0 bg-stone-100 group">
        <img
          src={images[imgIdx]?.url}
          alt={item.productTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
            {images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
                  i === imgIdx ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {item.productBrand}
          </p>
          <h4 className="text-sm font-bold text-stone-900 leading-snug">
            {item.productTitle}
          </h4>
          {/* Attributes */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {Object.entries(item.variantAttributes ?? {}).map(([k, v]) => (
              <span
                key={k}
                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-600"
              >
                {k}: {v}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-600">
              Qty: {item.quantity}
            </span>
          </div>
        </div>

        {/* Price + Status */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-black text-stone-900">
            ₹{item.price.toLocaleString("en-IN")}
          </span>
          <StatusBadge status={item.itemStatus} />
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ───────────────────────────────────────────────── */
const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { handleOrderDetails } = useOrder();
  const [order, setOrder] = useState(null);
  const loading = useSelector((state) => state.order.loading);

  useEffect(() => {
    (async () => {
      const data = await handleOrderDetails(orderId);
      setOrder(data ?? null);
    })();
  }, [orderId]);

  const addr = order?.shippingAddress;
  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      {/* ── Back button ── */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      {loading ? (
        <DetailSkeleton />
      ) : !order ? (
        /* ── Error State ── */
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
            <Package className="w-7 h-7 text-stone-300" />
          </div>
          <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
            Order not found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* ── Page header ── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-stone-900 tracking-tight">
                Order Details
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 shrink-0">
              <CalendarDays className="w-3.5 h-3.5" />
              {formattedDate}
            </div>
          </div>

          {/* ── Items ── */}
          <Card className="p-5">
            <SectionTitle icon={ShoppingBag} title="Items Ordered" />
            <div className="space-y-5 divide-y divide-stone-50">
              {order.items.map((item) => (
                <div key={item.itemId} className="pt-5 first:pt-0">
                  <OrderItemCard item={item} />
                </div>
              ))}
            </div>
          </Card>

          {/* ── Shipping Address ── */}
          <Card className="p-5">
            <SectionTitle icon={MapPin} title="Delivery Address" />
            <div className="space-y-2">
              <p className="text-sm font-bold text-stone-900">
                {addr?.fullname}
              </p>
              <p className="text-xs text-stone-500 leading-relaxed">
                {addr?.addressLine}
              </p>
              <p className="text-xs text-stone-500">
                {addr?.city}, {addr?.state} — {addr?.pincode}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Phone className="w-3 h-3 text-stone-400" />
                <span className="text-xs text-stone-500 font-medium">
                  {addr?.phone}
                </span>
              </div>
            </div>
          </Card>

          {/* ── Price Summary ── */}
          <Card className="p-5">
            <SectionTitle icon={CreditCard} title="Price Summary" />
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.itemId}
                  className="flex items-center justify-between text-xs text-stone-500"
                >
                  <span className="truncate max-w-[60%]">
                    {item.productTitle}{" "}
                    <span className="text-stone-300">×{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-stone-700">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className="pt-3 mt-1 border-t border-stone-100 flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-wider text-stone-900">
                  Total
                </span>
                <span className="text-lg font-black text-stone-900">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
