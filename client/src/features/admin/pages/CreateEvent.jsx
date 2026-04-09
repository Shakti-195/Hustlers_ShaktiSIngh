import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  
  // 1. Define the state for the form
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    price: "",
    description: ""
  });

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the new event object
    const newEvent = {
      ...formData,
      id: Date.now(), // Unique ID
      status: "Active"
    };

    // Save to localStorage (Simulating a database)
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
    localStorage.setItem("events", JSON.stringify([...existingEvents, newEvent]));

    alert("Event Created Successfully! 🎉");
    
    // Redirect back to Admin Dashboard
    navigate("/admin");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">Create Event</h1>
          <p className="text-slate-500">Fill in the details to launch your next big event.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. VIBE HACK 2026"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Venue Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ticket Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="99"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the excitement..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-[2] bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-100 hover:shadow-teal-200 transition-all active:scale-95"
            >
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}