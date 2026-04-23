import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegisterUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegisterUser({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    console.log("Registering:", formData);
    if (res) navigate("/");
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      {/* Compact Header Bar*/}
      <header className="h-[60px] bg-white/90 backdrop-blur-md px-6 py-3 border-b border-gray-100 flex items-center justify-between shrink-0 z-[100] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-base font-bold tracking-[0.25em] text-[#1a1a1a]">
          ATELIER
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </header>

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
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center lg:text-left">
                Create Account
              </h2>
              <p className="text-xs text-gray-500 mb-8 text-center lg:text-left">
                Join our community of curators and creators.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="group">
                  <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </div>

                {/* Email Address */}
                <div className="group">
                  <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@atelier.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </div>

                {/* Contact Number */}
                <div className="group">
                  <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                  />
                </div>

                {/* Password */}
                <div className="group">
                  <label className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5 block group-focus-within:text-[#3b557e] transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] border-none rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#3b557e]/5 outline-none transition-all text-[#1a1a1a]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9.88 9.88 3.59 3.59" />
                          <path d="m21 21-6.3-6.3" />
                          <path d="M2 12s3-7 10-7a7.14 7.14 0 0 1 3.86 1.14" />
                          <path d="M22 12s-3 7-10 7a7 7 0 0 1-4.71-1.89" />
                          <path d="M9 10.11V10a3 3 0 0 1 4.5-2.59" />
                          <path d="M11 14a3 3 0 0 0 4 0" />
                          <path d="m15 9 3-3" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isSeller"
                    name="isSeller"
                    checked={formData.isSeller}
                    onChange={handleChange}
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
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-4 cursor-pointer"
                >
                  Register
                </button>

                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-100"></div>
                  <span className="px-4 text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>

                <a
                  href="http://localhost:3000/api/auth/google"
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-[#1f1f1f] font-semibold py-3.5 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all uppercase tracking-[0.1em] text-[10px] cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fill="#4285F4"
                      d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.9 2.25C16.64 14.19 18 11.93 18 9.2z"
                    />
                    <path
                      fill="#34A853"
                      d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.25c-.81.54-1.85.87-3.06.87-2.35 0-4.34-1.58-5.05-3.71L.95 13.04C2.43 15.98 5.48 18 9 18z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M3.95 10.73c-.18-.54-.28-1.12-.28-1.73s.1-1.19.28-1.73L.95 4.96C.35 6.17 0 7.55 0 9s.35 2.83.95 4.04l3-2.31z"
                    />
                    <path
                      fill="#EA4335"
                      d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.42 0 9 0 5.48 0 2.43 2.02.95 4.96l3 2.31C4.66 5.16 6.65 3.58 9 3.58z"
                    />
                  </svg>
                  Continue with Google
                </a>
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
          <footer className="py-6 flex flex-col items-center border-t border-gray-50 mt-auto shrink-0 bg-[#fcfcfc]">
            <div className="flex gap-6 mb-3">
              <a
                href="#"
                className="text-[9px] font-bold text-gray-300 tracking-[0.2em] hover:text-[#1a1a1a] transition-colors uppercase"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[9px] font-bold text-gray-300 tracking-[0.2em] hover:text-[#1a1a1a] transition-colors uppercase"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-[9px] font-bold text-gray-300 tracking-[0.2em] hover:text-[#1a1a1a] transition-colors uppercase"
              >
                Support
              </a>
            </div>
            <p className="text-[8px] font-bold text-gray-200 tracking-[0.3em] uppercase">
              © 2024 ATELIER COLLECTIVE. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Register;
