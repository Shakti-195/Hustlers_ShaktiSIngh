import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../api/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        API.get("/events/all"),
        API.get("/bookings/all").catch(() => ({ data: [] })), // fallback if endpoint missing
      ]);
      setEvents(eventsRes.data || []);
      setBookings(bookingsRes.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeleting(eventId);
    try {
      await API.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      alert("Failed to delete event");
    } finally {
      setDeleting(null);
    }
  };

  // Stats derived from real data
  const stats = [
    {
      label: "Total Events",
      count: events.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "📅",
    },
    {
      label: "Tickets Sold",
      count: bookings.length,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: "🎟️",
    },
    {
      label: "Total Capacity",
      count: events.reduce((sum, e) => sum + (e.total_tickets || 0), 0),
      color: "text-orange-600",
      bg: "bg-orange-50",
      icon: "💺",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            Admin<span className="text-orange-500">Hub</span>
          </h1>
          <p className="text-slate-500 font-medium">Control Center • {new Date().getFullYear()}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/scan")}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center gap-2"
          >
            <span>📸</span> Scanner
          </button>
          <Link
            to="/admin/create"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-100"
          >
            + Create Event
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-orange-200 transition-all"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                {stat.label}
              </p>
              <p className={`text-4xl font-black ${stat.color}`}>
                {loading ? "—" : stat.count}
              </p>
            </div>
            <div className={`h-14 w-14 rounded-3xl ${stat.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* EVENTS TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">

        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            All Events
          </h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {events.length} total
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 font-medium">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate-400 font-medium mb-4">No events yet</p>
            <Link
              to="/admin/create"
              className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition"
            >
              Create First Event
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Event Name</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5">Tickets</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {events.map((event) => (
                  <tr key={event._id} className="group hover:bg-slate-50/50 transition-colors">

                    <td className="px-8 py-6">
                      <p className="text-slate-900 font-bold">{event.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{event.description?.slice(0, 50)}...</p>
                    </td>

                    <td className="px-8 py-6 text-slate-500 font-medium">
                      📍 {event.location}
                    </td>

                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                        {event.total_tickets} seats
                      </span>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deleting === event._id}
                        className="p-2 text-slate-400 hover:text-red-500 transition disabled:opacity-40"
                        title="Delete"
                      >
                        {deleting === event._id ? "⏳" : "🗑️"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}