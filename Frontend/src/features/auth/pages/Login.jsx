import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../schemas/validationSchemas";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import FormField from "../components/FormField";
import PasswordToggleIcon from "../components/PasswordToggleIcon";

const Login = () => {
  const navigate = useNavigate();
  const { handleLoginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const res = await handleLoginUser({
      email: data.email,
      password: data.password,
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
      {/* Main Content Area - Split Layout consistent with Register */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side Image - Cinematic Zoom Effect */}
        <div className="hidden lg:block lg:w-1/2 relative h-full overflow-hidden group">
          <img
            src="/login_side.png"
            alt="Atelier Fashion"
            className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#1a1a1a]/15"></div>
          <div className="absolute bottom-12 left-12 text-white max-w-md">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2 opacity-80">
              Welcome Back
            </p>
            <h3 className="text-3xl font-bold leading-tight mb-4">
              Step into the curated world of Atelier.
            </h3>
            <div className="w-12 h-[2px] bg-white opacity-40"></div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-[#fcfcfc] flex flex-col no-scrollbar">
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
            <div className="w-full max-w-[340px]">
              <Heading />
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center lg:text-left">
                Sign In
              </h2>
              <p className="text-xs text-gray-500 mb-8 text-center lg:text-left">
                Welcome back to your personalized boutique.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                {/* Password */}
                <div className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="password"
                      className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block group-focus-within:text-[#3b557e] transition-colors"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-[9px] font-bold text-gray-400 hover:text-[#3b557e] transition-colors uppercase tracking-widest cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-4 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
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

              {/* Redirect to Register */}
              <p className="mt-8 text-center text-[10px] text-gray-400 font-medium tracking-widest">
                NEW HERE?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-[#3b557e] font-extrabold hover:underline transition-all ml-1 uppercase cursor-pointer"
                >
                  Create Account
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

export default Login;
