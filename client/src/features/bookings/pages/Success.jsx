import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <div className="p-6 text-gray-400">No booking found</div>;
  }

  const { event, tickets, total } = data;

  // ✅ Stable Ticket ID
  const ticketId =
    data?.ticketId || Math.floor(100000 + Math.random() * 900000);

  // ✅ Meaningful QR Data (IMPORTANT)
  const qrData = JSON.stringify({
    ticketId,
    eventId: event.id,
    title: event.title,
    location: event.location,
    tickets,
    total,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">

        {/* EVENT IMAGE */}
        <img
          src={event.image}
          alt="event"
          className="w-full h-48 object-cover"
        />

        {/* CONTENT */}
        <div className="p-6 text-center">

          {/* ICON */}
          <div className="text-green-500 text-5xl mb-3">
            🎉
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Booking Confirmed!
          </h1>

          <p className="text-gray-500 mb-6">
            Your ticket is ready. Show this at entry.
          </p>

          {/* TICKET CARD */}
          <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">

            <h2 className="font-semibold text-gray-800">
              {event.title}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              📍 {event.location}
            </p>

            <div className="border-t pt-2 mt-2 text-sm text-gray-600">
              <p>🎟 Tickets: {tickets}</p>
              <p>💰 Paid: ₹{total}</p>
            </div>

          </div>

          {/* TICKET ID */}
          <div className="bg-black text-white rounded-lg py-2 mb-4 font-mono text-lg tracking-widest">
            #{ticketId}
          </div>

          {/* QR CODE */}
          <div className="flex justify-center mb-6">
            <QRCodeCanvas
              value={qrData}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate(-2)}
              className="bg-gray-200 text-gray-700 py-2 rounded-lg"
            >
              Book Another Event
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}