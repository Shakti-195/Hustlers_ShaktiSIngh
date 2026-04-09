const API = "https://event-ticketing-api-fs8v.onrender.com";

// ✅ Auto-attach token to every fetch request
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// =====================
// GET ALL EVENTS (requires lat/lng)
// =====================
export const getEvents = async (lat = 26.8467, lng = 80.9462) => {
  try {
    const res = await fetch(`${API}/events/nearby?lat=${lat}&lng=${lng}`, {
      headers: getHeaders(),
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching events", err);
    return [];
  }
};

// =====================
// GET SINGLE EVENT
// =====================
export const getEvent = async (id, lat = 26.8467, lng = 80.9462) => {
  try {
    const res = await fetch(`${API}/events/nearby?lat=${lat}&lng=${lng}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return data.find((e) => String(e._id) === String(id) || String(e.id) === String(id));
  } catch (err) {
    console.error("Error fetching event", err);
    return null;
  }
};

// =====================
// BOOK TICKET
// =====================
export const bookTicket = async (payload) => {
  try {
    const res = await fetch(`${API}/bookings/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Booking failed");

    return await res.json();
  } catch (err) {
    console.error("Booking error:", err);
    return null;
  }
};