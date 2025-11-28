import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteWarehousePartner,
  getAllWarehousePartners,
  getWarehousePartnerById,
  updateWarehousePartner,
  updateWarehousePartnerStatus,
} from "./warehouse-partners.service";

// Get all warehouse partners
export const useGetAllWarehousePartners = ({
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
  return useQuery({
    queryKey: [
      "warehouse-partners",
      {
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
    ],
    queryFn: () =>
      getAllWarehousePartners({
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
      }),
  });
};

// Get by id
export const useGetWarehousePartnerById = (id) => {
  return useQuery({
    queryKey: ["warehouse-partner", id],
    queryFn: () => getWarehousePartnerById(id),
    enabled: !!id,
  });
};

// Update warehouse partner
export const useUpdateWarehousePartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateWarehousePartner,
    onSuccess,
    onError,
  });
};

// Delete warehouse partner
export const useDeleteWarehousePartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteWarehousePartner,
    onSuccess,
    onError,
  });
};

// Update status
export const useUpdateWarehousePartnerStatus = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateWarehousePartnerStatus,
    onSuccess,
    onError,
  });
};
