import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCourierPartner,
  deleteCourierPartner,
  getAllCourierPartners,
  getCourierPartnerById,
  toggleCourierPartner,
  updateCourierPartner,
} from "./courier-partners.service";

// Get all Courier Partners
export const useGetAllCourierPartners = ({ page, limit }) => {
  return useQuery({
    queryKey: ["courier-partners", { page, limit }],
    queryFn: () => getAllCourierPartners({ page, limit }),
  });
};

// Get by id
export const useGetCourierPartnerById = (id) => {
  return useQuery({
    queryKey: ["courier-partner", id],
    queryFn: () => getCourierPartnerById(id),
    enabled: !!id,
  });
};

// Create Courier Partner
export const useCreateCourierPartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCourierPartner,
    onSuccess,
    onError,
  });
};

// Delete Courier Partner
export const useDeleteCourierPartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteCourierPartner,
    onSuccess,
    onError,
  });
};

// Update Courier Partner
export const useUpdateCourierPartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCourierPartner,
    onSuccess,
    onError,
  });
};

// Toggle Courier Partner
export const useToggleCourierPartner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: toggleCourierPartner,
    onSuccess,
    onError,
  });
};
