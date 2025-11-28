import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import EditNotificationForm from "@/features/notification-management/components/EditNotificationForm";
import {
  useGetNotificationManagementById,
  useUpdateNotificationManagement,
} from "@/features/notification-management/notification-management.query";
import { updateNotificationSchema } from "@/features/notification-management/notification-management.schema";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { message } from "antd";
import { Form } from "antd";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/notification-management/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data, isLoading, isError, error } =
    useGetNotificationManagementById(id);

  const { mutate, isPending } = useUpdateNotificationManagement({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notification-management"]);
      message.success("Notification updated successfully");
      form.resetFields();
      navigate({ to: "/notification-management" });
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue(data?.data);
    }
  }, [data?.data, form]);

  const handleSubmit = (values) => {
    handleFormSubmission({
      form,
      schema: updateNotificationSchema,
      onSubmit: (data) => mutate({ id, data }),
      values,
    });
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Notification Management", href: "/notification-management" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title="Edit Notification Management">
        <EditNotificationForm
          form={form}
          isPending={isPending}
          submitForm={handleSubmit}
          navigate={navigate}
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
