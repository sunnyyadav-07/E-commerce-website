/**
 * FormUI.jsx — shared form primitives for the seller portal.
 * Import from here to avoid duplicating styles and logic
 * across CreateParentProduct, CreateProductVariants, EditProduct, etc.
 */
import { CheckCircle2, AlertCircle } from "lucide-react";

/* ── Design token ──────────────────────────────────────────────────────────── */
export const inputClass =
  "w-full bg-[#f3f4f6] border border-transparent rounded-xl px-5 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b557e]/20 focus:border-[#3b557e]/30 focus:bg-white transition-all text-[#1a1a1a]";

/* ── Section divider ───────────────────────────────────────────────────────── */
export const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-slate-200" />
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">
      {children}
    </span>
    <div className="h-px flex-1 bg-slate-200" />
  </div>
);

/* ── Field wrapper with icon label and optional hint ───────────────────────── */
export const FormField = ({ label, icon: Icon, hint, error, children }) => (
  <div className="group space-y-2.5">
    <label className="flex items-center gap-2 text-[9px] font-bold text-gray-500 tracking-[0.25em] uppercase group-focus-within:text-[#3b557e] transition-colors">
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[10px] font-semibold text-red-400 tracking-wide pl-1">{error}</p>
    )}
    {hint && !error && (
      <p className="text-[9px] text-gray-400 font-medium pl-1">{hint}</p>
    )}
  </div>
);

/* ── Success / error banner ────────────────────────────────────────────────── */
export const StatusBanner = ({ type, message }) => {
  if (!message) return null;
  const ok = type === "success";
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border text-sm font-medium ${
        ok
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-rose-50 border-rose-200 text-rose-700"
      }`}
    >
      {ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
};

/* ── Colour swatch picker ──────────────────────────────────────────────────── */
export const PRESET_COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Navy", hex: "#1d3461" },
  { name: "Olive", hex: "#6b7c3e" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Camel", hex: "#c19a6b" },
  { name: "Slate", hex: "#607d8b" },
  { name: "Coral", hex: "#e2725b" },
];

export const ColorPicker = ({ value, onChange }) => (
  <div className="space-y-2.5">
    <div className="flex flex-wrap gap-2">
      {PRESET_COLORS.map((c) => (
        <button
          key={c.name}
          type="button"
          title={c.name}
          onClick={() => onChange(c.name)}
          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 cursor-pointer ${
            value === c.name
              ? "border-[#3b557e] ring-2 ring-[#3b557e]/30 scale-110"
              : "border-white shadow-sm"
          }`}
          style={{ backgroundColor: c.hex }}
        />
      ))}
    </div>
    <input
      type="text"
      name="color"
      id="field-color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g., Midnight Blue"
      className={inputClass}
    />
  </div>
);

/* ── Size chip picker ──────────────────────────────────────────────────────── */
export const STANDARD_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  28,
  30,
  32,
  34,
  36,
];

export const SizePicker = ({ value, onChange }) => (
  <div className="space-y-2.5">
    <div className="flex flex-wrap gap-2">
      {STANDARD_SIZES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded-xl border-2 text-xs font-bold tracking-wide cursor-pointer transition-all ${
            value === s
              ? "border-[#3b557e] bg-[#3b557e]/5 text-[#3b557e]"
              : "border-slate-200 bg-[#f3f4f6] text-slate-500 hover:border-[#3b557e]/30 hover:text-[#3b557e]/70"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
    <input
      type="text"
      name="size"
      id="field-size"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="or type a custom size…"
      className={inputClass}
    />
  </div>
);

/* ── Primary submit button ─────────────────────────────────────────────────── */
export const SubmitButton = ({
  isLoading,
  disabled,
  loadingText,
  children,
}) => (
  <button
    type="submit"
    disabled={isLoading || disabled}
    className="w-full bg-[#3b557e] text-white flex items-center justify-center gap-3 py-4 rounded-xl shadow-lg shadow-[#3b557e]/20 hover:bg-[#2d4363] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
  >
    {isLoading ? (
      <>
        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
          {loadingText ?? "Saving…"}
        </span>
      </>
    ) : (
      children
    )}
  </button>
);
