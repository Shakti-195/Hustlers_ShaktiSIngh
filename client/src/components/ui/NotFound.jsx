import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
      {/* Playful Image Placeholder (Amazon often uses their dogs here) */}
      <div className="mb-8">
        <div className="text-8xl">🐕</div> 
        {/* You can replace this emoji with an actual image of a cute dog or a broken plug */}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          SORRY!
        </h1>
        <p className="text-xl text-orange-600 font-medium mb-4">
          we couldn't find that page
        </p>
        
        <div className="max-w-md text-gray-600 mb-8">
          Try searching or go to 
          <Link to="/" className="text-blue-600 hover:text-orange-600 hover:underline mx-1">
            EventHub's home page
          </Link>.
        </div>

        {/* Amazon-style search bar look-alike */}
        <div className="flex w-full max-w-sm mx-auto mb-10">
          <input 
            type="text" 
            placeholder="Search for events..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
          />
          <button className="bg-orange-400 hover:bg-orange-500 px-5 py-2 rounded-r-md transition">
            <span className="text-white font-bold">Go</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline hover:text-orange-600 font-medium"
          >
            &larr; Go Back
          </button>
          <Link to="/home" className="text-blue-600 hover:underline hover:text-orange-600 font-medium">
            Your Dashboard
          </Link>
          <Link to="/help" className="text-blue-600 hover:underline hover:text-orange-600 font-medium">
            Help Center
          </Link>
        </div>
      </div>

      {/* Footer-style branding */}
      <div className="mt-20 pt-8 border-t border-gray-100 w-full text-center">
        <span className="text-2xl font-black text-slate-800 tracking-tighter italic">
          Event<span className="text-orange-500">Hub</span>
        </span>
      </div>
    </div>
  );
}