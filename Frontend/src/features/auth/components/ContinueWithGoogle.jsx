import React from 'react'

const ContinueWithGoogle = () => {
  return (
    <a
      href="http://localhost:3000/api/auth/google"
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-[#1f1f1f] font-semibold py-3.5 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all uppercase tracking-widest text-[10px] cursor-pointer"
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
  );
}

export default ContinueWithGoogle
