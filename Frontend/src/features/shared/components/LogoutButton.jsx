import { LogOut } from "lucide-react";
import useAuth from "../../auth/hooks/useAuth";

/**
 * Reusable logout button.
 * @param {"sidebar" | "navbar"} variant - Controls layout/styling:
 *   - "sidebar" : full-width row with label (used in SellerNavigation)
 *   - "navbar"  : compact inline button with hidden-on-mobile label (used in Navbar)
 */
const LogoutButton = ({ variant = "navbar" }) => {
  const { handleLogoutUser } = useAuth();

  if (variant === "sidebar") {
    return (
      <div className="px-4 py-4 border-t border-slate-100">
        <button
          onClick={handleLogoutUser}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 group"
        >
          <LogOut
            size={20}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
          <span className="text-sm font-medium tracking-wide">Logout</span>
        </button>
      </div>
    );
  }

  // default: "navbar"
  return (
    <button
      onClick={handleLogoutUser}
      className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-500 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 text-[11px] uppercase tracking-widest font-bold group"
    >
      <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      <span className="hidden md:inline">Logout</span>
    </button>
  );
};

export default LogoutButton;
