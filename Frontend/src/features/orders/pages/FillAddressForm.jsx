import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ChevronLeft,
  MapPin,
  User,
  Phone,
  Home,
  Hash,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { useOrder } from "../hooks/useOrder";
import {
  FormField,
  inputClass,
  SectionLabel,
  SubmitButton,
} from "../../shared/components/FormUI";
import AppFooter from "../../shared/components/AppFooter";


/* ═══════════════════════════════════════════════════════════════════════ */
const FillAddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCreateOrder } = useOrder();

  /* order payload passed via router state (productId, variantId, qty etc.) */
  const orderMeta = location.state ?? {};

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await handleCreateOrder({
        ...orderMeta,
        shippingAddress: form,
      });
      setDone(true);
      setTimeout(() => navigate("/"), 2000);
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Success overlay ── */
  if (done) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5 text-center px-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 ring-4 ring-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Order Placed!
          </h2>
          <p className="text-sm text-stone-400 max-w-xs">
            Your order has been placed successfully. Redirecting you to home…
          </p>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="min-h-screen bg-[#F9F7F4] font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-xl font-bold tracking-[0.15em] uppercase text-stone-900">
            Atelier
          </span>
          <ShoppingBag className="w-5 h-5 text-stone-400" />
        </div>
      </nav>

      {/* ── Body ── */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Page title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-[#3b557e]/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#3b557e]" />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
              Delivery Address
            </h1>
          </div>
          <p className="text-sm text-stone-400 pl-12">
            We'll ship your order to the address below.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ── Contact ── */}
            <SectionLabel>Contact details</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Full Name" icon={User}>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Phone Number" icon={Phone}>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </FormField>
            </div>

            {/* ── Address ── */}
            <SectionLabel>Shipping address</SectionLabel>

            <FormField label="Address" icon={Home}>
              <textarea
                name="address"
                id="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                placeholder="House / Flat No., Street, Area, Landmark…"
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField label="City" icon={MapPin}>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Mumbai"
                  className={inputClass}
                />
              </FormField>

              <FormField label="State" icon={MapPin}>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  placeholder="Maharashtra"
                  className={inputClass}
                />
              </FormField>

              <FormField label="PIN Code" icon={Hash}>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  placeholder="400001"
                  className={inputClass}
                />
              </FormField>
            </div>


            {/* ── Submit ── */}
            <div className="pt-2">
              <SubmitButton
                isLoading={submitting}
                loadingText="Placing Order…"
              >
                <ShoppingBag className="w-5 h-5" />
                Place Order
              </SubmitButton>
            </div>

            <p className="text-center text-[10px] text-stone-300 uppercase tracking-widest">
              Secure checkout · 30-day returns · Free shipping above ₹2000
            </p>
          </form>
        </div>
      </main>

      {/* ── Footer ── */}
      <AppFooter className="mt-16" />
    </div>
  );
};

export default FillAddressForm;
