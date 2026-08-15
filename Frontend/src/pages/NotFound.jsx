import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Animated 404 number */}
        <div className="relative mb-8 select-none">
          <span
            className="text-[10rem] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #3b557e 0%, #8aa6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
          {/* floating dot decoration */}
          <span className="absolute top-4 right-0 w-5 h-5 rounded-full bg-[#3b557e]/20 animate-bounce" />
          <span className="absolute bottom-4 left-2 w-3 h-3 rounded-full bg-[#3b557e]/10 animate-bounce delay-200" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-extrabold text-[#1a1a1a] mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#3b557e] text-white text-sm font-semibold shadow-lg shadow-[#3b557e]/20 hover:bg-[#2a3d5e] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#3b557e] text-sm font-semibold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
