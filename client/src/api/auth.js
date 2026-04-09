import API from "./api";

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  // ✅ Save token
  localStorage.setItem("token", res.data.access_token);

  // ✅ Save user WITH role from backend response
  localStorage.setItem("user", JSON.stringify({
    email: res.data.email,
    role: res.data.role
  }));

  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};