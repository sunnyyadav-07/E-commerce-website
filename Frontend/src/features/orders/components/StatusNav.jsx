import { Clock, CheckCircle2, XCircle, LayoutDashboard } from "lucide-react";
import OrderStatusNavBar from "./OrderStatusNavBar";

const TABS = [
  { label: "Pending", to: "/seller/order/pending", icon: Clock },
  { label: "Delivered", to: "/seller/order/delivered", icon: CheckCircle2 },
  { label: "Cancelled", to: "/seller/order/cancelled", icon: XCircle },
];

const StatusNav = () => (
  <OrderStatusNavBar
    tabs={TABS}
    backTo="/seller/dashboard"
    backLabel="Dashboard"
    BackIcon={LayoutDashboard}
    title="Orders"
  />
);

export default StatusNav;
