import axiosInstance from "@/utils/axiosInstance.util";

// get All Location Serviceability
export const getAllLocationServiceability = async ({ page, limit }) => {
  const response = await axiosInstance.get(
    "v1/admin/serviceability/locations",
    { params: { page, limit } }
  );
  return response.data;
};

// Create Location Serviceability
export const createLocationServiceability = async (data) => {
  const response = await axiosInstance.post(
    "v1/admin/serviceability/locations",
    data
  );
  return response.data;
};

// Get by id
export const getLocationServiceabilityById = async (id) => {
  const response = await axiosInstance.get(
    `v1/admin/serviceability/locations/${id}`
  );
  return response.data;
};

// Update Location Serviceability
export const updateLocationServiceability = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `v1/admin/serviceability/locations/${id}`,
    data
  );
  return response.data;
};

// Toggle Location Serviceability
export const toggleLocationServiceability = async ({ id, data }) => {
  const response = await axiosInstance.patch(
    `v1/admin/serviceability/locations/${id}/toggle`,
    data
  );
  return response.data;
};
