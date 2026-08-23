import {
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  LayoutList,
  ShoppingBag,
} from "lucide-react";
import OrderStatusNavBar from "./OrderStatusNavBar";

const TABS = [
  { label: "All", to: "/my-orders/all-order", icon: LayoutList },
  { label: "Pending", to: "/my-orders/pending", icon: Clock },
  { label: "Processing", to: "/my-orders/processing", icon: RotateCcw },
  { label: "Shipped", to: "/my-orders/shipped", icon: Truck },
  { label: "Delivered", to: "/my-orders/delivered", icon: CheckCircle2 },
  { label: "Cancelled", to: "/my-orders/cancelled", icon: XCircle },
];

const BuyerStatusNav = () => (
  <OrderStatusNavBar
    tabs={TABS}
    backTo="/"
    backLabel="Home"
    title="My Orders"
    TitleIcon={ShoppingBag}
  />
);

export default BuyerStatusNav;
