import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import PasswordToggleIcon from "../components/PasswordToggleIcon";

const Login = () => {
  const navigate = useNavigate();
  const { handleLoginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLoginUser({
      email: formData.email,
      password: formData.password,
    });
    // sirf success pe navigate karo
    if (res.user.role == "buyer") {
      navigate("/");
    } else if (res.user.role == "seller") {
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

        {/* Right Side Form - Compact & Centered */}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="group">
                  <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@atelier.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </div>

                {/* Password */}
                <div className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase block group-focus-within:text-[#3b557e] transition-colors">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-[9px] font-bold text-gray-400 hover:text-[#3b557e] transition-colors uppercase tracking-widest cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer"
                    >
                      <PasswordToggleIcon show={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-4 cursor-pointer"
                >
                  Sign In
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
