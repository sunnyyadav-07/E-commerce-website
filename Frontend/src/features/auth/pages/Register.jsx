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
    await handleRegisterUser({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    console.log("Registering:", formData);
    navigate("/");
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      {/* Compact Header Bar*/}
      <header className="h-[60px] bg-white/90 backdrop-blur-md px-6 py-3 border-b border-gray-100 flex items-center justify-between shrink-0 z-[100] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-900 transition-colors"
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
          <button className="text-gray-500 hover:text-gray-900 transition-colors">
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
          <button className="text-gray-500 hover:text-gray-900 transition-colors">
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3b557e] transition-colors"
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
                  className="w-full bg-[#3b557e] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#2d4363] hover:shadow-lg transition-all uppercase tracking-[0.2em] text-[10px] mt-4"
                >
                  Register
                </button>
              </form>

              {/* Redirect link */}
              <p className="mt-8 text-center text-[10px] text-gray-400 font-medium tracking-widest">
                ALREADY HAVE AN ACCOUNT?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#3b557e] font-extrabold hover:underline transition-all ml-1 uppercase"
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
