import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let user = null;
  const userStr = localStorage.getItem("user");
  try {
    user = userStr && userStr !== 'undefined' ? JSON.parse(userStr) : null;
  } catch (e) {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
