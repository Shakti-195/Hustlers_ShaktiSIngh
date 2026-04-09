import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP NAV */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto p-6">
        <Outlet />
      </div>

    </div>
  );
}