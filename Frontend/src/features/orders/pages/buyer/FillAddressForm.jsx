import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, MapPin, User, Phone, Home, Hash } from "lucide-react";
import {
  FormField,
  inputClass,
  SectionLabel,
  SubmitButton,
} from "../../../shared/components/FormUI";
import AppFooter from "../../../shared/components/AppFooter";
import { addressSchema } from "../../../auth/schemas/validationSchemas";

/* ═══════════════════════════════════════════════════════════════════════ */
const FillAddressForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
          <MapPin className="w-5 h-5 text-stone-400" />
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
              Add Address
            </h1>
          </div>
          <p className="text-sm text-stone-400 pl-12">
            Enter the details of your delivery address.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ── Contact ── */}
            <SectionLabel>Contact details</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="Full Name"
                icon={User}
                error={errors.fullName?.message}
              >
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  className={inputClass}
                  {...register("fullName")}
                />
              </FormField>

              <FormField
                label="Phone Number"
                icon={Phone}
                error={errors.phone?.message}
              >
                <input
                  type="tel"
                  id="phone"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                  {...register("phone")}
                />
              </FormField>
            </div>

            {/* ── Address ── */}
            <SectionLabel>Address details</SectionLabel>

            <FormField
              label="Address"
              icon={Home}
              error={errors.address?.message}
            >
              <textarea
                id="address"
                rows={3}
                placeholder="House / Flat No., Street, Area, Landmark…"
                className={`${inputClass} resize-none`}
                {...register("address")}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField
                label="City"
                icon={MapPin}
                error={errors.city?.message}
              >
                <input
                  type="text"
                  id="city"
                  placeholder="Mumbai"
                  className={inputClass}
                  {...register("city")}
                />
              </FormField>

              <FormField
                label="State"
                icon={MapPin}
                error={errors.state?.message}
              >
                <input
                  type="text"
                  id="state"
                  placeholder="Maharashtra"
                  className={inputClass}
                  {...register("state")}
                />
              </FormField>

              <FormField
                label="PIN Code"
                icon={Hash}
                error={errors.pincode?.message}
              >
                <input
                  type="text"
                  id="pincode"
                  maxLength={6}
                  placeholder="400001"
                  className={inputClass}
                  {...register("pincode")}
                />
              </FormField>
            </div>

            {/* ── Submit ── */}
            <div className="pt-2">
              <SubmitButton isLoading={isSubmitting} loadingText="Saving…">
                <MapPin className="w-5 h-5" />
                Save Address
              </SubmitButton>
            </div>
          </form>
        </div>
      </main>

      {/* ── Footer ── */}
      <AppFooter className="mt-16" />
    </div>
  );
};

export default FillAddressForm;
