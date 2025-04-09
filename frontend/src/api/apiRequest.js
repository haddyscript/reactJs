import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (userData) => {
    return await api.post("/user/register", userData);
};

export const loginUser = async (userData) => {
    return await api.post("/user/login", userData);
};

export const logoutUser = async (token) => {
    return await api.post("/user/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
  

export const getProtectedData = async (token) => {
    return await api.get("/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteUser = async (userId, token) => {
    return await api.delete(`/delete/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};
  
export const getAdminData = async (token) => {
    return await api.get("/admin", {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getMyUserProfile = async (token) => {
    return await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
}