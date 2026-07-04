import { Eye, EyeOff } from "lucide-react";

/**
 * Renders an Eye or EyeOff icon from lucide-react depending on the `show` prop.
 *
 * Props:
 *  - show  {boolean}  true  → EyeOff (password is visible, click to hide)
 *                     false → Eye    (password is hidden,  click to show)
 *  - size  {number}   icon size in px (default: 16)
 */
const PasswordToggleIcon = ({ show, size = 16 }) => {
  return show ? <EyeOff size={size} /> : <Eye size={size} />;
};

export default PasswordToggleIcon;
