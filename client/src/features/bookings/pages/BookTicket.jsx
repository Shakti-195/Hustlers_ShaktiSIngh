import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent, bookTicket } from "../../../lib/apiClient";
import eventsData from "../../events/data/events";

export default function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const backendEvent = await getEvent(id);

        if (backendEvent) {
          setEvent({
            ...backendEvent,
            id: backendEvent._id || backendEvent.id,
          });
        } else {
          // fallback to local data
          const local = eventsData.find((e) => e.id === Number(id));
          if (local) setEvent(local);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  // ⏳ Loading state
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading event...
      </div>
    );
  }

  const total = tickets * event.price;

  // 💳 Handle Booking → Payment
  const handleBooking = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      let bookingData = {
        event,
        tickets,
        total,
      };

      // ✅ Backend booking (if logged in)
      if (token) {
        const res = await bookTicket({
          event_id: event.id,
          tickets: tickets,
          total: total,
        });

        if (res && res.booking_id) {
          bookingData = {
            ...bookingData,
            bookingId: res.booking_id,
            qr: res.qr_code,
          };
        }
      }

      // 👉 Navigate to Payment Page
      navigate("/payment", {
        state: bookingData,
      });

    } catch (error) {
      console.error("Booking failed:", error);

      // fallback: still go to payment
      navigate("/payment", {
        state: {
          event,
          tickets,
          total,
        },
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">

        {/* 🔥 LEFT SIDE - EVENT IMAGE */}
        <div className="relative">
          <img
            src={event.image}
            alt="event"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 bg-black/50 text-white p-4 w-full">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm">📍 {event.location}</p>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE - BOOKING DETAILS */}
        <div className="p-6 flex flex-col justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Book Your Ticket 🎟️
            </h1>

            <p className="text-gray-500 mb-6">
              Select number of tickets and proceed to payment
            </p>

            {/* PRICE */}
            <div className="mb-6">
              <p className="text-gray-500">Price per ticket</p>
              <p className="text-xl font-bold text-orange-500">
                ₹{event.price}
              </p>
            </div>

            {/* 🎫 TICKET SELECTOR */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl mb-6">

              <span className="font-medium text-gray-700">Tickets</span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTickets((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 bg-white shadow rounded-full text-lg"
                >
                  -
                </button>

                <span className="text-lg font-bold">{tickets}</span>

                <button
                  onClick={() => setTickets((prev) => prev + 1)}
                  className="w-8 h-8 bg-white shadow rounded-full text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* 💰 TOTAL */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-green-600">
                ₹{total}
              </span>
            </div>
          </div>

          {/* 💳 BUTTON */}
          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Payment 💳"}
          </button>

        </div>

      </div>

    </div>
  );
}