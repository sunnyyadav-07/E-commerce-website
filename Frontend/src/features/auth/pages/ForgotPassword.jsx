import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import useAuth from "../hooks/useAuth";
import { forgotPasswordSchema } from "../schemas/validationSchemas";

const ForgotPassword = () => {
  const { handleSendEmailForgotPassword } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await handleSendEmailForgotPassword(data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      <main className="flex-1 overflow-hidden">
        {/* ── Form panel ── */}
        <div className="w-full h-full overflow-y-auto bg-[#fcfcfc] flex flex-col no-scrollbar">
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
            <div className="w-full max-w-85">
              <Heading />
              {!isSubmitted && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center lg:text-left">
                    Forgot Password
                  </h2>
                  <p className="text-xs text-gray-500 mb-8 text-center lg:text-left">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password.
                  </p>

                  <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* ── Email field ── */}
                    <FormField
                      label="Email Address"
                      id="email"
                      error={errors.email?.message}
                    >
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...register("email")}
                          className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/10 outline-none transition-all text-[#1a1a1a] pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                          <Mail size={16} strokeWidth={1.5} />
                        </span>
                      </div>
                    </FormField>

                    {/* ── Submit button ── */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>

                  {/* ── Back to login ── */}
                  <p className="mt-6 text-center text-xs text-gray-400">
                    Remember your password?{" "}
                    <a
                      href="/login"
                      className="text-[#3b557e] font-semibold hover:underline"
                    >
                      Back to Login
                    </a>
                  </p>
                </div>
              )}

              {/* ── Success message ── */}
              {isSubmitted && (
                <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle
                      size={22}
                      strokeWidth={1.8}
                      className="text-emerald-500"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-1">
                      Check your inbox!
                    </p>
                    <p className="text-[11px] text-emerald-600/80 leading-relaxed">
                      We&apos;ve sent a reset link to{" "}
                      <span className="font-semibold">{getValues("email")}</span>.
                    </p>
                  </div>
                  <div className="w-full border-t border-emerald-100 pt-3 text-[10px] text-gray-400 leading-relaxed">
                    Didn&apos;t receive it?{" "}
                    <span className="font-semibold text-gray-500">
                      Check your spam folder
                    </span>{" "}
                    or{" "}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="font-semibold text-[#3b557e] hover:underline cursor-pointer"
                    >
                      try again
                    </button>
                    .
                  </div>
                </div>
              )}
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
