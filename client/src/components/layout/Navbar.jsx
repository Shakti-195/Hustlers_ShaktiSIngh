import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    try {
      setUser(stored && stored !== 'undefined' ? JSON.parse(stored) : null);
    } catch(e) {
      setUser(null);
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const username = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)
    : "Guest";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive(path) ? "text-orange-600 bg-orange-50" : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 md:px-6 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`max-w-7xl mx-auto flex justify-between items-center px-5 py-2.5 rounded-2xl transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border border-white/40" : "bg-transparent"
      }`}>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 z-[110]">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tighter text-slate-900 italic">
            Event<span className="text-orange-500">Hub</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-1">

          <Link to="/home" className={linkClass("/home")}>
            Browse Events
          </Link>

          {/* Admin only */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className={linkClass("/admin")}>
                📊 Dashboard
              </Link>
              <Link to="/admin/create" className={linkClass("/admin/create")}>
                ➕ Create Event
              </Link>
              <Link
                to="/scan"
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                SCANNER
              </Link>
            </>
          )}
        </div>

        {/* USER ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                  {user.role === "admin" ? "Admin" : "Logged In"}
                </p>
                <p className="text-sm font-bold text-slate-800">{username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-100 hover:from-orange-600 hover:to-pink-600 transition active:scale-95"
              >
                Join EventHub
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden z-[110] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-slate-800 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-800 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-800 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
          {user && (
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-2">
                {username.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{username}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.role}</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            <Link to="/home" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium">Browse Events</Link>

            {user?.role === "admin" && (
              <>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-orange-500">📊 Dashboard</Link>
                <Link to="/admin/create" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-orange-500">➕ Create Event</Link>
                <Link to="/scan" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium">Scanner</Link>
              </>
            )}

            <div className="h-px w-20 bg-slate-100 my-2"></div>

            {user ? (
              <button onClick={handleLogout} className="text-xl font-bold text-red-500">Sign Out</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold">
                Get Started
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}