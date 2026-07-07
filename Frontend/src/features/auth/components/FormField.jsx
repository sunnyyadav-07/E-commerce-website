/**
 * Reusable form field for auth forms.
 *
 * Props:
 *  - label       : string — displayed label text
 *  - id          : string — input id (for a11y)
 *  - error       : string | undefined — error message from RHF
 *  - children    : ReactNode — the <input> (or custom element) slot
 *
 * Usage:
 *  <FormField label="Email Address" id="email" error={errors.email?.message}>
 *    <input id="email" {...register("email")} ... />
 *  </FormField>
 */
const FormField = ({ label, id, error, extra, children }) => {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors"
      >
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-[10px] font-semibold text-red-400 tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
