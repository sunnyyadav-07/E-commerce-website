import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Check } from "lucide-react";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import PasswordToggleIcon from "../components/PasswordToggleIcon";
import useAuth from "../hooks/useAuth";
import { resetPasswordSchema } from "../schemas/authSchemas";

/* ---------- password strength helper ---------- */
const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = [
  "",
  "bg-red-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-emerald-400",
];

const ResetPassword = () => {
  const navigate = useNavigate();
  const { handleResetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [show, setShow] = useState({ new: false, confirm: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  // watch only newPassword for the live strength bar & requirements list.
  // This is intentional — the strength UI *needs* live updates per keystroke.
  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const strength = getStrength(newPassword);
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const requirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "One number", met: /[0-9]/.test(newPassword) },
    {
      label: "One special character",
      met: /[^A-Za-z0-9]/.test(newPassword),
    },
  ];

  const onSubmit = async (data) => {
    const res = await handleResetPassword({
      token,
      newPassword: data.confirmPassword,
    });
    if (res) {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── Left decorative panel ── */}
        <div className="hidden lg:block lg:w-1/2 relative h-full overflow-hidden group">
          {/* gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-[#0f1c2e] via-[#1e3354] to-[#0f1c2e]" />

          {/* subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3b557e]/20 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#3b557e]/10 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* center lock illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 backdrop-blur-sm shadow-2xl">
                <Lock size={32} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-3">
                  Security
                </p>
                <h3 className="text-3xl font-bold leading-tight text-white max-w-xs text-center">
                  Create a strong, secure password.
                </h3>
                <div className="w-12 h-0.5 bg-white/20 mx-auto mt-5 rounded-full" />
              </div>
            </div>
          </div>

          {/* bottom caption */}
          <div className="absolute bottom-12 left-12 text-white max-w-md">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 opacity-50">
              Atelier
            </p>
            <p className="text-sm font-medium text-white/30">
              Your account security matters to us.
            </p>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-[#fcfcfc] flex flex-col no-scrollbar">
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
            <div className="w-full max-w-85">
              <Heading />

              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center lg:text-left">
                Reset Password
              </h2>
              <p className="text-xs text-gray-500 mb-8 text-center lg:text-left">
                Choose a new password for your account.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* ── New Password ── */}
                <div className="group">
                  <label
                    htmlFor="newPassword"
                    className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={show.new ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...register("newPassword")}
                      className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/10 outline-none transition-all text-[#1a1a1a] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((prev) => ({ ...prev, new: !prev.new }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer"
                    >
                      <PasswordToggleIcon show={show.new} />
                    </button>
                  </div>

                  {/* strength bar — shown while typing, driven by watch() */}
                  {newPassword && (
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength
                                ? strengthColor[strength]
                                : "bg-gray-100"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${
                          strength <= 1
                            ? "text-red-400"
                            : strength === 2
                              ? "text-yellow-500"
                              : strength === 3
                                ? "text-blue-500"
                                : "text-emerald-500"
                        }`}
                      >
                        {strengthLabel[strength]}
                      </p>
                    </div>
                  )}

                  {errors.newPassword && (
                    <p className="mt-1.5 text-[10px] font-semibold text-red-400 tracking-wide">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* ── Confirm Password ── */}
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={show.confirm ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                      className={`w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 outline-none transition-all text-[#1a1a1a] pr-12 ${
                        confirmPassword
                          ? passwordsMatch
                            ? "focus:ring-2 focus:ring-emerald-400/20"
                            : "focus:ring-2 focus:ring-red-400/20"
                          : "focus:ring-2 focus:ring-[#3b557e]/10"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer"
                    >
                      <PasswordToggleIcon show={show.confirm} />
                    </button>
                  </div>

                  {/* match indicator */}
                  {confirmPassword && (
                    <p
                      className={`mt-1.5 text-[9px] font-bold tracking-widest uppercase transition-colors ${
                        passwordsMatch ? "text-emerald-500" : "text-red-400"
                      }`}
                    >
                      {passwordsMatch
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}

                  {errors.confirmPassword && (
                    <p className="mt-1 text-[10px] font-semibold text-red-400 tracking-wide">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* ── Requirements checklist ── */}
                {newPassword && (
                  <div className="bg-[#f3f4f6] rounded-xl p-4 space-y-2">
                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-2">
                      Requirements
                    </p>
                    {requirements.map((req) => (
                      <div key={req.label} className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                            req.met
                              ? "bg-emerald-100 text-emerald-500"
                              : "bg-gray-200 text-gray-300"
                          }`}
                        >
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        <span
                          className={`text-[10px] font-medium transition-colors duration-200 ${
                            req.met ? "text-emerald-600" : "text-gray-400"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
