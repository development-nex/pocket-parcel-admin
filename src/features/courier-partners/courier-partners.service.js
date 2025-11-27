import axiosInstance from "@/utils/axiosInstance.util";

// Get All Courier Partners
export const getAllCourierPartners = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/admin/courier-partners", {
    params: { page, limit },
  });
  return response.data;
};

// Get by id
export const getCourierPartnerById = async (id) => {
  const response = await axiosInstance.get(`/v1/admin/courier-partners/${id}`);
  return response.data;
};

// Create Courier Partner
export const createCourierPartner = async (data) => {
  const response = await axiosInstance.post("/v1/admin/courier-partners", data);
  return response.data;
};

// Update Courier Partner
export const updateCourierPartner = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/v1/admin/courier-partners/${id}`,
    data
  );
  return response.data;
};

// Delete Courier Partner
export const deleteCourierPartner = async (id) => {
  const response = await axiosInstance.delete(
    `/v1/admin/courier-partners/${id}`
  );
  return response.data;
};

// Toggle Courier Partner
export const toggleCourierPartner = async ({ id, data }) => {
  const response = await axiosInstance.patch(
    `/v1/admin/courier-partners/${id}/toggle`,
    data
  );
  return response.data;
};
