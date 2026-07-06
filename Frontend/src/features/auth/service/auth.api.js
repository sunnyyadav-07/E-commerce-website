import { api } from "./axiosAuthInstance";

export async function registerUser({
  email,
  password,
  fullname,
  contact,
  isSeller,
}) {
  const response = await api.post("/register", {
    email,
    password,
    fullname,
    contact,
    isSeller,
  });
  return response.data;
}

export async function loginUser({ email, password }) {
  const response = await api.post("/login", { email, password });

  return response.data;
}
export async function setUserRole({ role }) {
  const response = await api.patch("/user/role", { role });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/me");
  return response.data;
}

export async function logoutUser() {
  const response = await api.post("/logout");
  return response.data;
}

export async function sendEmailForgotPassword(email) {
  const response = await api.post("/forgot-password", { email });
  return response.data;
}

export async function resetPassword(data) {
  const response = await api.post("/reset-password", data);
  return response.data
}
