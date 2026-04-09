import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <div className="p-6">No booking found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-100 p-6">

      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[350px] text-center">

        {/* 🎉 Header */}
        <h1 className="text-2xl font-bold mb-2">
          🎉 Booking Confirmed!
        </h1>

        <p className="text-gray-500 mb-4">
          Show this at entry
        </p>

        {/* 🎫 Ticket Card */}
        <div className="bg-gray-100 rounded-xl p-4 mb-4 text-left">

          <h2 className="font-bold text-lg mb-1">
            {data.event.title}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            📍 {data.event.location}
          </p>

          <hr className="my-2" />

          <p>🎟 Tickets: {data.tickets}</p>
          <p>💰 Paid: ₹{data.total}</p>

          {data.bookingId && (
            <p className="mt-2 font-semibold">
              ID: #{data.bookingId}
            </p>
          )}
        </div>

        {/* 🔥 QR CODE */}
        <div className="flex justify-center mb-4">
          <QRCode
            value={data.bookingId || JSON.stringify(data)}
            size={130}
          />
        </div>

        {/* Buttons */}
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg mb-2"
        >
          Back to Home
        </button>

        <button
          onClick={() => navigate("/events")}
          className="w-full bg-gray-200 py-2 rounded-lg"
        >
          Book Another Event
        </button>
      </div>
    </div>
  );
}