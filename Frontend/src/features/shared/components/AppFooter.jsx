/**
 * AppFooter — shared site footer
 *
 * Props:
 *  - className {string} extra classes for the <footer> tag (optional)
 */
const AppFooter = ({ className = "" }) => (
  <footer
    className={`border-t border-stone-200 bg-stone-900 text-stone-300 ${className}`}
  >
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-stone-600">
      <span>© 2026 Atelier. All rights reserved.</span>
      <span>Instagram · Twitter</span>
    </div>
  </footer>
);

export default AppFooter;
