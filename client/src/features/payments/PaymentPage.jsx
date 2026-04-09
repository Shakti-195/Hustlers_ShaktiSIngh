import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../lib/apiClient";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [loading, setLoading] = useState(false);

  // Load Razorpay Checkout Script safely
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!data) {
    return <div className="p-6 text-center mt-10">No booking data found</div>;
  }

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Ask Backend to Generate a Razorpay Order
      const order = await createRazorpayOrder(data.total);

      if (!order) {
        alert("Failed to initialize backend payment order");
        setLoading(false);
        return;
      }

      // 2. Setup Razorpay Popup Options
      const options = {
        key: "rzp_test_SaxRAk3WfS2MN7", // Should ideally be an ENV var, but hardcoded matching your python backend
        amount: order.amount,
        currency: order.currency,
        name: "EventHub",
        description: `Purchase Tickets for ${data.event.title}`,
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify returned signature on success
          setLoading(true);
          const verifyStatus = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyStatus && verifyStatus.status.trim() === "Payment verified") {
            // Success! Route to QR code Success Page
            navigate("/payment-success", { state: data });
          } else {
            alert("Payment Verification Failed on Backend");
            setLoading(false);
          }
        },
        prefill: {
          name: "Guest",
          email: "user@example.com",
        },
        theme: {
          color: "#4f46e5", // Indigo to match your UI
        },
      };

      // 4. Launch Razorpay Window
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        alert("Payment was aborted or failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Error starting checkout process.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px]">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Secure Checkout 💳
        </h2>

        {/* Booking Info */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p><b>Event:</b> {data.event.title}</p>
          <p><b>Tickets:</b> {data.tickets}</p>
          <hr className="my-2 border-gray-300" />
          <p className="text-green-600 font-bold text-xl flex justify-between items-center">
            <span>Total Payable:</span> <span>₹{data.total}</span>
          </p>
        </div>

        {/* Disclaimer instead of fake form since Razorpay handles CC internally */}
        <div className="text-xs text-gray-500 mb-6 text-center px-4">
          By clicking pay you will be securely redirected to our payment partner, Razorpay. All cards, UPI, and netbanking methods are supported.
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Initializing..." : `Pay ₹${data.total} Now`}
        </button>
      </div>
    </div>
  );
}