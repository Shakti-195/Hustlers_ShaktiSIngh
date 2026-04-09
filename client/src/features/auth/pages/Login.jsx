import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../api/auth";
import Logo from "../../../components/ui/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser({ email, password });
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "admin") navigate("/admin");
      else navigate("/home");

      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
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
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* FORM */}
        <div className="px-10 py-8">

          {error && (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-5 font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? "Verifying..." : "Login →"}
            </button>
          </form>

          <p className="text-sm mt-8 text-slate-500 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 cursor-pointer font-bold hover:underline"
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}