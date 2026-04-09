import { useNavigate } from "react-router-dom";
import CrowdParticles from "../../../components/ui/CrowdParticles";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-[#e65100] via-[#d81b60] to-[#7b1fa2] flex items-center justify-center">
      
      {/* Wave Animation Background */}
      <CrowdParticles />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white px-6 text-center">
        
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight drop-shadow-lg">
            EventHub
          </h1>
          <span className="text-5xl md:text-6xl animate-bounce">🎉</span>
        </div>

        <p className="mt-2 text-base md:text-lg font-medium opacity-90 max-w-lg leading-snug">
          Discover college fests, workshops, and local events happening around you.
        </p>

        <div className="mt-10 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-orange-600 px-10 py-2.5 rounded-full font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border-2 border-white/60 bg-white/5 backdrop-blur-sm text-white px-10 py-2.5 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
          >
            Sign Up
          </button>
        </div>

      </div>
      
      {/* Bottom subtle detail */}
      <div className="absolute bottom-10 w-full text-center opacity-30 text-[10px] tracking-[0.3em] font-bold text-white uppercase">
         Hyper-Local Ticketing Platform
      </div>
    </div>
  );
}