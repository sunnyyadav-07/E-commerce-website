import { useRazorpay } from "react-razorpay";
import { useOrder } from "./useOrder";
import { useNavigate } from "react-router";

export const usePayment = () => {
  const { Razorpay, error, isLoading } = useRazorpay();
  const navigate = useNavigate();
  const { handleCreateOrder, handleVerifypayment, handlecancelPayment } =
    useOrder();
  async function initiatePayment(user, items, isFromCart = false) {
    const order = await handleCreateOrder({ items });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order?.amount,
      currency: order?.currency,
      name: "Atelier",
      description: "Test Transaction",
      order_id: order?.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        const verifyRes = await handleVerifypayment(
          {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          isFromCart,
        );
        if (verifyRes.success) {
          navigate(`/order-success/${verifyRes.orderId}`);
        }
      },

      modal: {
        ondismiss: async function () {
          await handlecancelPayment({ razorpayOrderId: order?.id });
        },
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
