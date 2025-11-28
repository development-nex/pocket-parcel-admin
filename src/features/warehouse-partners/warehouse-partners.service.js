import axiosInstance from "@/utils/axiosInstance.util";

// Get all warehouse partners
export const getAllWarehousePartners = async ({
  page,
  limit,
  search,
  offset,
  city,
  state,
  country,
  property_type,
  ground_floor_access,
  direct_road_access,
  parking_loading_area_available,
}) => {
  const response = await axiosInstance.get("/v1/partners", {
    params: {
      page,
      limit,
      search,
      offset,
      city,
      state,
      country,
      property_type,
      ground_floor_access,
      direct_road_access,
      parking_loading_area_available,
    },
  });
  return response.data;
};

// Get by id
export const getWarehousePartnerById = async (id) => {
  const response = await axiosInstance.get(`/v1/partners/${id}`);
  return response.data;
};

// Update partner
export const updateWarehousePartner = async ({ id, data }) => {
  const response = await axiosInstance.put(`/v1/partners/${id}`, data);
  return response.data;
};

// update partner status
export const updateWarehousePartnerStatus = async ({ id, data }) => {
  const response = await axiosInstance.patch(`/v1/partners/${id}/status`, data);
  return response.data;
};

// Delete partner
export const deleteWarehousePartner = async (id) => {
  const response = await axiosInstance.delete(`/v1/partners/${id}`);
  return response.data;
};
