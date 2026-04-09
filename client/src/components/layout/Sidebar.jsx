import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const menu = [
    { name: "🏠 Home", path: "/" },
    ...(isAdmin
      ? [
          { name: "📊 Dashboard", path: "/admin" },
          { name: "➕ Create Event", path: "/admin/create" }
        ]
      : [])
  ];

  return (
    <div className="w-64 bg-white p-6 shadow h-screen border-r">

      <h1 className="text-xl font-bold text-orange-500 mb-8">
        EventHub
      </h1>

      <div className="flex flex-col gap-4">

        {menu.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-orange-100 text-orange-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}

      </div>
    </div>
  );
}