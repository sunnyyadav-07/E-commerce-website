import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { registerSchema } from "../schemas/validationSchemas";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import FormField from "../components/FormField";
import PasswordToggleIcon from "../components/PasswordToggleIcon";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegisterUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { isSeller: false },
  });

  const onSubmit = async (data) => {
    const res = await handleRegisterUser({
      email: data.email,
      password: data.password,
      fullname: data.fullName,
      contact: data.contact,
      isSeller: data.isSeller,
    });
    if (!res) return; // API error — useAuth already dispatched the error
    if (res.user.role === "buyer") {
      navigate("/");
    } else if (res.user.role === "seller") {
      navigate("/seller/dashboard");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      {/* Main Content Area - Split Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side Image - Cinematic Zoom Effect */}
        <div className="hidden lg:block lg:w-1/2 relative h-full overflow-hidden group">
          <img
            src="/register_side.png"
            alt="Atelier Fashion"
            className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#1a1a1a]/10"></div>
          <div className="absolute bottom-12 left-12 text-white max-w-md">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 opacity-80">
              The Atelier Collective
            </p>
            <h3 className="text-3xl font-bold leading-tight mb-4">
              Designed for those who appreciate the finer details.
            </h3>
            <div className="w-12 h-[2px] bg-white opacity-40"></div>
          </div>
        </div>

        {/* Right Side Form - Compact & Scrollable */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-[#fcfcfc] flex flex-col no-scrollbar">
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
            <div className="w-full max-w-[340px]">
              <Heading />
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center lg:text-left">
                Create Account
              </h2>
              <p className="text-xs text-gray-500 mb-8 text-center lg:text-left">
                Join our community of curators and creators.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <FormField
                  label="Full Name"
                  id="fullName"
                  error={errors.fullName?.message}
                >
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    {...register("fullName")}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </FormField>

                {/* Email Address */}
                <FormField
                  label="Email Address"
                  id="email"
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    placeholder="name@atelier.com"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </FormField>

                {/* Contact Number */}
                <FormField
                  label="Contact Number"
                  id="contact"
                  error={errors.contact?.message}
                >
                  <input
                    id="contact"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    {...register("contact")}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </FormField>

                {/* Password */}
                <div className="group">
                  <label
                    htmlFor="password"
                    className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...register("password")}
                      className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer"
                    >
                      <PasswordToggleIcon show={showPassword} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-[10px] font-semibold text-red-400 tracking-wide">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isSeller"
                    {...register("isSeller")}
                    className="w-4 h-4 rounded border-gray-300 text-[#3b557e] focus:ring-[#3b557e] transition-all cursor-pointer"
                  />
                  <label
                    htmlFor="isSeller"
                    className="text-[11px] font-semibold text-gray-500 cursor-pointer select-none"
                  >
                    Register as Seller
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-4 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-100"></div>
                  <span className="px-4 text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>
                <ContinueWithGoogle />
              </form>

              {/* Redirect link */}
              <p className="mt-8 text-center text-[10px] text-gray-400 font-medium tracking-widest">
                ALREADY HAVE AN ACCOUNT?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#3b557e] font-extrabold hover:underline transition-all ml-1 uppercase cursor-pointer"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>

          {/* Compact Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Register;
