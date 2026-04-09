import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../../../lib/apiClient";
import EventCard from "../../../components/ui/EventCard";
import eventsData from "../data/events";

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      let formatted = [];

      try {
        const data = await getEvents();

        if (data && data.length > 0) {
          // ✅ BACKEND DATA
          formatted = data.map((event, index) => ({
            id: event.id || index + 1,
            title: event.title || "Untitled Event",
            location: event.location || "Unknown",
            price: event.price ? `₹${event.price}` : "Free",
            category: event.category || "Tech",
            image:
              event.image ||
              `https://picsum.photos/400/25${index}`,
          }));
        } else {
          // 🔥 FALLBACK → events.js
          formatted = eventsData.map((event) => ({
            ...event,
            price: `₹${event.price}`,
          }));
        }
      } catch (error) {
        // 🔥 API FAIL → events.js
        formatted = eventsData.map((event) => ({
          ...event,
          price: `₹${event.price}`,
        }));
      }

      setEvents(formatted);
      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔥 FILTER
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading events...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-8 rounded-xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold">
          Discover Events Near You 🎉
        </h1>
        <p className="mt-2">
          Find fests, workshops, and meetups happening around you
        </p>
      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {["All", "Tech", "Music", "Sports", "Workshops"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EVENTS */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          🔥 Trending Events
        </h2>

        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}