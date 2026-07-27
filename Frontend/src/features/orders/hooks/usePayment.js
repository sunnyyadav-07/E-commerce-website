import { useRazorpay } from "react-razorpay";
import { useOrder } from "./useOrder";

export const usePayment = () => {
  const { Razorpay, error, isLoading } = useRazorpay();
  const { handleCreateOrder, handleVerifypayment } = useOrder();
  async function initiatePayment(user, items) {
    const order = await handleCreateOrder({ items: [] });
    console.log("order", order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order?.amount,
      currency: order?.currency,
      name: "My Company",
      description: "Test Transaction",
      order_id: order?.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        await handleVerifypayment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
      },
      prefill: {
        name: user?.fullname,
        email: user?.email,
        contact: user?.address?.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  return { initiatePayment };
};
