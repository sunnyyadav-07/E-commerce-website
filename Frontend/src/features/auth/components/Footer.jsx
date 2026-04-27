import React from 'react'

const Footer = () => {
  return (
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
  );
}

export default Footer