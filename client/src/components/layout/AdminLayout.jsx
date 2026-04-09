import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    // Removed 'flex' so the layout stacks vertically
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR - Now sits at the very top, full width */}
      <Navbar />

      {/* MAIN AREA */}
      <div className="flex flex-col">
        
        {/* Content container with max-width to keep things centered and readable */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>

      </div>

    </div>
  );
}