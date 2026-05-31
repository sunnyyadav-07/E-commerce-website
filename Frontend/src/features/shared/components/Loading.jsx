import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-white">
      {/* Spinner */}
      <div className="w-10 h-10 rounded-full border-[3px] border-[#3b557e]/20 border-t-[#3b557e] animate-spin" />

      {/* Message */}
      {message && (
        <p className="text-sm font-medium text-slate-400 tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
