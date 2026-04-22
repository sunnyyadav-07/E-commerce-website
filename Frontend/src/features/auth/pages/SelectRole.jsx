import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const SelectRole = () => {
  const navigate = useNavigate();
  const { handleSetUserRole } = useAuth();
  async function handleClick(role) {
    const res = await handleSetUserRole({ role });
    console.log("working");
    if (res) {
      navigate("/");
    }
  }
  const roles = [
    {
      id: "buyer",
      title: "Curation & Discovery",
      subtitle: "I WANT TO SHOP",
      description:
        "Discover unique pieces from curated designers and boutiques worldwide.",
      image: "/buyer_role_bg.png",
      link: "/",
      color: "bg-[#3b557e]",
    },
    {
      id: "seller",
      title: "Artistry & Commerce",
      subtitle: "I WANT TO SELL",
      description:
        "Showcase your craft and reach a global audience with your boutique.",
      image: "/seller_role_bg.png",
      link: "/",
      color: "bg-[#1a1a1a]",
    },
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col font-sans text-gray-800 overflow-hidden">
      {/* Header */}
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
        <div className="w-[18px]"></div>
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 flex flex-col lg:flex-row relative">
        {roles.map((role) => (
          <div
            key={role.id}
            className="group relative flex-1 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-in-out cursor-pointer hover:flex-[1.4]"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={role.image}
                alt={role.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    role.id === "buyer"
                      ? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80";
                }}
              />
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${role.color}/40 group-hover:opacity-60`}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-white text-center px-8 max-w-md transform transition-all duration-500 group-hover:scale-105">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-80 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                {role.subtitle}
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
                {role.title}
              </h2>
              <div className="w-12 h-[2px] bg-white mx-auto mb-8 opacity-40 transition-all duration-700 group-hover:w-24 group-hover:opacity-100"></div>
              <p className="text-sm font-medium opacity-0 group-hover:opacity-90 transition-all duration-500 translate-y-8 group-hover:translate-y-0 leading-relaxed max-w-[280px] mx-auto">
                {role.description}
              </p>

              <button
                className="mt-10 px-10 py-4 border border-white/30 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 backdrop-blur-sm bg-white/5"
                onClick={() => {
                  handleClick(role.id);
                }}
              >
                Select Journey
              </button>
            </div>

            {/* Side Indicator Line (Desktop) */}
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100`}
            ></div>
          </div>
        ))}

        {/* Center Divider Logo (Desktop Only) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full items-center justify-center z-[50] shadow-2xl border border-gray-100/50 backdrop-blur-md group select-none pointer-events-none">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1a1a1a]">
            VS
          </span>
        </div>
      </main>
    </div>
  );
};

export default SelectRole;
