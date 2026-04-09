import { useNavigate } from "react-router-dom";
import { useState } from "react";
// ✅ Path ko apne naye apiClient.js se match karein
// ✅ Function name ko 'signupUser' rakhein (jo humne apiClient mein banaya tha)
import { signupUser } from "../../../lib/apiClient"; 
import Logo from "../../../components/ui/Logo";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ signupUser use karein jo humne apiClient mein define kiya hai
      await signupUser(formData);
      alert("Account created successfully! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      // Backend se exact error message dikhane ke liye
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        
        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-8 text-center flex flex-col items-center">
          <Logo className="h-16 w-16 mb-3" />
          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            Event<span className="text-orange-100">Hub</span>
          </h1>
          <p className="text-orange-100 mt-1 text-sm font-medium">
            Join us to discover nearby events.
          </p>
        </div>

        {/* FORM */}
        <div className="px-10 py-8">
          {error && (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-5 font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Create Password"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {/* ✅ ROLE SELECT */}
            <select
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all text-gray-600 bg-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">👤 User</option>
              <option value="admin">🛠️ Admin</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-sm mt-8 text-slate-500 text-center">
            Already a member?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer font-bold hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}