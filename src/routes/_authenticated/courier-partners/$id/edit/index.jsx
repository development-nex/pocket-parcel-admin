import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import EditCourierPartnerForm from "@/features/courier-partners/components/EditCourierPartnerForm";
import {
  useGetCourierPartnerById,
  useUpdateCourierPartner,
} from "@/features/courier-partners/courier-partners.query";
import { updateCourierPartnerSchema } from "@/features/courier-partners/courier-partners.schema";
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
  "/_authenticated/courier-partners/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate, isPending } = useUpdateCourierPartner({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["courier-partners"]);
      message.success("Courier Partner updated successfully");
      form.resetFields();
      navigate({ to: "/courier-partners" });
    },
  });
  const { data, isLoading, isError, error } = useGetCourierPartnerById(id);
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue(data?.data);
    }
  }, [data?.data, form]);

  const handleSubmit = (values) => {
    handleFormSubmission({
      form,
      schema: updateCourierPartnerSchema,
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
        { title: "Courier Partners", href: "/courier-partners" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title="Edit Courier Partners">
        <EditCourierPartnerForm
          form={form}
          handleSubmit={handleSubmit}
          loading={isPending}
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
