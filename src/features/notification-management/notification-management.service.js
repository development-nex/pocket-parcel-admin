import axiosInstance from "@/utils/axiosInstance.util";

// get all notification management
export const getAllNotificationManagement = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/notifications/admin", {
    params: { page, limit },
  });
  return response.data;
};

// get notification management by id
export const getNotificationManagementById = async (id) => {
  const response = await axiosInstance.get(`/v1/notifications/admin/${id}`);
  return response.data;
};

// update notification management
export const updateNotificationManagement = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/v1/notifications/admin/${id}`,
    data
  );
  return response.data;
};

// Create notification management
export const createNotificationManagement = async (data) => {
  const response = await axiosInstance.post("/v1/notifications/admin", data);
  return response.data;
};

// Delete notification management
export const deleteNotificationManagement = async (id) => {
  const response = await axiosInstance.delete(`/v1/notifications/admin/${id}`);
  return response.data;
};

// Send notification management
export const sendNotificationManagement = async (id) => {
  const response = await axiosInstance.post(
    `/v1/notifications/admin/${id}/send`
  );
  return response.data;
};
