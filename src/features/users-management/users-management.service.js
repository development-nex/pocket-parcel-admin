import axiosInstance from "@/utils/axiosInstance.util";

// Get all users
export const getAllUsers = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/users", {
    params: { page, limit },
  });
  return response.data;
};

// Get user by Id
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/v1/users/${id}`);
  return response.data;
};

// Create user
export const createUser = async (data) => {
  const response = await axiosInstance.post("/v1/users", data);
  return response.data;
};

// Ban user
export const banUser = async (id) => {
  const response = await axiosInstance.put(`/v1/users/${id}/ban`);
  return response.data;
};

// UnBan user
export const unBanUser = async (id) => {
  const response = await axiosInstance.put(`/v1/users/${id}/unban`);
  return response.data;
};

// Reactivate user
export const reactivateUser = async (id) => {
  const response = await axiosInstance.put(`/v1/users/${id}/reactivate`);
  return response.data;
};
