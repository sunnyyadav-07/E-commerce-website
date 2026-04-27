import React from 'react'

const Heading = () => {
  return (
    <div className="mb-12 flex justify-center lg:justify-start">
      <div className="group relative inline-flex flex-col items-center lg:items-start cursor-default">
        <h1 className="text-4xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] via-[#3b557e] to-[#1a1a1a] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:tracking-[0.35em] py-1">
          ATELIER
        </h1>
        <div className="w-12 h-[2px] bg-[#3b557e] mt-2 rounded-full transition-all duration-700 group-hover:w-full opacity-80 shadow-[0_0_8px_rgba(59,85,126,0.6)]"></div>
      </div>
    </div>
  );
}

export default Heading