const isProd = import.meta.env.MODE === "production";
const API = isProd 
  ? "https://event-ticketing-api-fs8v.onrender.com"
  : "http://localhost:8000";

// ✅ Auto-attach token to every fetch request
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// =====================
// 🔐 AUTH (Signup & Login) - Added these
// =====================

export const signupUser = async (userData) => {
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Signup failed");
    return data;
  } catch (err) {
    console.error("Signup error:", err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");

    // ✅ Save token and user info
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      
      // Construct user object safely depending on backend structure
      const userObj = data.user || { email: data.email, role: data.role };
      localStorage.setItem("user", JSON.stringify(userObj));
    }
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
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
    // Standard ID endpoint check
    const res = await fetch(`${API}/events/${id}`, {
      headers: getHeaders(),
    });
    
    if (res.ok) return await res.json();

    // Fallback: search in nearby list (original logic)
    const allEvents = await getEvents(lat, lng);
    return allEvents.find((e) => String(e._id) === String(id) || String(e.id) === String(id));
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Booking failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Booking error:", err);
    throw err;
  }
};