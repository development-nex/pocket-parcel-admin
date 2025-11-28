import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNotificationManagement,
  deleteNotificationManagement,
  getAllNotificationManagement,
  getNotificationManagementById,
  sendNotificationManagement,
  updateNotificationManagement,
} from "./notification-management.service";

// Get all notifications
export const useGetAllNotificationManagement = ({ page, limit }) => {
  return useQuery({
    queryKey: ["notification-management", { page, limit }],
    queryFn: () => getAllNotificationManagement({ page, limit }),
  });
};

// Get By Id
export const useGetNotificationManagementById = (id) => {
  return useQuery({
    queryKey: ["notification-management", id],
    queryFn: () => getNotificationManagementById(id),
    enabled: !!id,
  });
};

// Create Notification
export const useCreateNotificationManagement = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: createNotificationManagement,
    onSuccess,
    onError,
    ...rest,
  });
};

// Update Notification
export const useUpdateNotificationManagement = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: updateNotificationManagement,
    onSuccess,
    onError,
    ...rest,
  });
};

// Delete Notification
export const useDeleteNotificationManagement = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: deleteNotificationManagement,
    onSuccess,
    onError,
    ...rest,
  });
};

// Send Notification
export const useSendNotificationManagement = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: sendNotificationManagement,
    onSuccess,
    onError,
    ...rest,
  });
};
