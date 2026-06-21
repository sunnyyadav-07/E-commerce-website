const FOOTER_LINKS = {
  Shop: ["Men", "Women", "Kids", "Sale"],
  Help: ["Shipping & Returns", "Size Guide", "Contact Us", "FAQ"],
  Company: ["About Us", "Careers", "Press", "Sustainability"],
};

const HomeFooter = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1">
          <h2 className="text-white font-black tracking-[0.2em] uppercase text-base mb-4">
            Atelier
          </h2>
          <p className="text-xs leading-relaxed text-stone-500 max-w-[200px]">
            A curated edit of timeless wardrobe essentials. Crafted with
            intention, made to last.
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-6">
            {["IG", "TW", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-500 hover:border-stone-400 hover:text-white transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h5 className="text-[10px] uppercase tracking-widest text-stone-500 mb-4 font-semibold">
              {heading}
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800 max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between gap-2 text-[10px] uppercase tracking-widest text-stone-600">
        <span>© 2026 Atelier. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
