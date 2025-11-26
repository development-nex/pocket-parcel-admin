import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLocationServiceability,
  getAllLocationServiceability,
  getLocationServiceabilityById,
  toggleLocationServiceability,
  updateLocationServiceability,
} from "./location-serviceability.service";

// Get location serviceability
export const useGetLocationServiceability = ({ page, limit }) => {
  return useQuery({
    queryKey: ["location-serviceability", { page, limit }],
    queryFn: () => getAllLocationServiceability({ page, limit }),
  });
};

// Create location serviceability
export const useCreateLocationServiceability = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: createLocationServiceability,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get by Id
export const useGetLocationServiceabilityById = (id) => {
  return useQuery({
    queryKey: ["location-serviceability", id],
    queryFn: () => getLocationServiceabilityById(id),
    enabled: !!id,
  });
};

// Update location serviceability
export const useUpdateLocationServiceability = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: updateLocationServiceability,
    onSuccess,
    onError,
    ...rest,
  });
};

// Toggle location serviceability
export const useToggleLocationServiceability = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: toggleLocationServiceability,
    onSuccess,
    onError,
    ...rest,
  });
};
