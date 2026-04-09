import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvent } from "../../../lib/apiClient";
import eventsData from "../data/events";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      // ✅ Try backend first
      const backendEvent = await getEvent(id);

      if (backendEvent) {
        setEvent({
          ...backendEvent,
          id: backendEvent._id || backendEvent.id,
          price: `₹${backendEvent.price}`,
          description:
            backendEvent.description ||
            "This is a detailed description of the event. Enjoy amazing experience and networking.",
        });
      } else {
        // 🔥 Fallback to local data
        const local = eventsData.find((e) => e.id === Number(id));
        if (local) {
          setEvent({
            ...local,
            price: `₹${local.price}`,
            description:
              "This is a detailed description of the event. Enjoy amazing experience and networking.",
          });
        }
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* IMAGE */}
      <img
        src={event.image}
        alt="event"
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {event.title}
        </h1>

        <p className="text-gray-500 mb-2">
          📍 {event.location}
        </p>

        <p className="text-orange-500 font-bold text-lg mb-4">
          {event.price}
        </p>

        <p className="text-gray-600 mb-6">
          {event.description}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/book/${event.id}`)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Book Ticket
          </button>
        </div>

      </div>
    </div>
  );
}