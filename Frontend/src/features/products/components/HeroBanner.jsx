const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9F7F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

        {/* Left — Text */}
        <div className="flex-1 z-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-stone-400 mb-5 font-medium">
            SS 2026 — New Collection
          </p>
          <h1 className="text-5xl md:text-[5.5rem] font-black text-stone-900 leading-[1.02] tracking-tight mb-6">
            Crafted
            <br />
            <span className="text-[#3b557e]">for the</span>
            <br />
            modern.
          </h1>
          <p className="text-stone-500 text-base max-w-sm leading-relaxed mb-10">
            Timeless silhouettes in premium fabrics. Discover pieces built to
            last beyond the trend cycle.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="cursor-pointer px-8 py-4 bg-[#3b557e] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#2d4363] active:scale-95 transition-all duration-200 rounded-2xl shadow-md shadow-[#3b557e]/30">
              Shop All
            </button>
            <button className="cursor-pointer px-8 py-4 border-2 border-stone-300 text-stone-700 text-xs uppercase tracking-[0.2em] font-bold hover:border-stone-900 hover:text-stone-900 active:scale-95 transition-all duration-200 rounded-2xl">
              Explore Looks
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-stone-200">
            {[
              { value: "2k+", label: "Products" },
              { value: "50k+", label: "Happy Customers" },
              { value: "4.9★", label: "Avg Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-stone-900">{value}</p>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image Collage */}
        <div className="hidden md:flex flex-1 gap-4 max-w-lg">
          {/* Tall left image */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-stone-200 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
                alt="Men's fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          {/* Right column — two stacked */}
          <div className="flex-1 flex flex-col gap-4 mt-10">
            <div className="aspect-square rounded-3xl overflow-hidden bg-stone-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop"
                alt="Women's fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop"
                alt="Men's style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Decorative blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#3b557e]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-stone-300/20 blur-2xl pointer-events-none" />
    </section>
  );
};

export default HeroBanner;
