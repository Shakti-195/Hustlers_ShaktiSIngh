import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

import Home from "../features/events/pages/Home";
import EventDetails from "../features/events/pages/EventDetails";
import BookTicket from "../features/bookings/pages/BookTicket";
import Success from "../features/bookings/pages/Success";
import NotFound from "../components/ui/NotFound";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import CreateEvent from "../features/admin/pages/CreateEvent";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ScanTicket from "../features/bookings/pages/ScanTicket";
import Landing from "../features/landing/pages/Landing";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC - no navbar */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* USER PAGES - with Navbar */}
      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/book/:id" element={<BookTicket />} />
        <Route path="/success/:id" element={<Success />} />
        <Route path="/scan" element={<ScanTicket />} />
      </Route>

      {/* ADMIN PAGES - with Sidebar + Navbar */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateEvent />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}