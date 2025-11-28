import { useMutation, useQuery } from "@tanstack/react-query";
import {
  banUser,
  createUser,
  getAllUsers,
  getUserById,
  reactivateUser,
  unBanUser,
} from "./users-management.service";

// Get all users
export const useGetAllUsers = ({ page, limit }) => {
  return useQuery({
    queryKey: ["users", { page, limit }],
    queryFn: () => getAllUsers({ page, limit }),
  });
};

// Get user by Id
export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};

// Create user
export const useCreateUser = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess,
    onError,
    ...rest,
  });
};

// Ban user
export const useBanUser = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: banUser,
    onSuccess,
    onError,
    ...rest,
  });
};

// Unbar user
export const useUnBanUser = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: unBanUser,
    onSuccess,
    onError,
    ...rest,
  });
};

// Reactivate user
export const useReactivateUser = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: reactivateUser,
    onSuccess,
    onError,
    ...rest,
  });
};
