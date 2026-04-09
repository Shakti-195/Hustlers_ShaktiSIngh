export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      {/* ✅ IMAGE FIX */}
      <img
        src={event.image}
        alt="event"
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">

        <h3 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500">
          📍 {event.location}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-orange-500 font-bold">
            {event.price}
          </span>

          <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            Book
          </button>
        </div>

      </div>
    </div>
  );
}