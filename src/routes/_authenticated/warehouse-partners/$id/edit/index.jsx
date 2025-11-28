import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import WarehousePartnerForm from "@/features/warehouse-partners/components/WarehousePartnerForm";
import {
  useGetWarehousePartnerById,
  useUpdateWarehousePartner,
} from "@/features/warehouse-partners/warehouse-partners.query";
import { updateWarehousePartnerSchema } from "@/features/warehouse-partners/warehouse-partners.schema";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { message } from "antd";
import { Button, Form } from "antd";
import { useEffect } from "react";
import { useState } from "react";

export const Route = createFileRoute(
  "/_authenticated/warehouse-partners/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { data, isLoading, isError, error } = useGetWarehousePartnerById(id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue(data?.data);
    }
  }, [data?.data, form]);
  // Convert uploaded images to Base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const { mutate, isPending } = useUpdateWarehousePartner({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["warehouse-partners"]);
      message.success("Partner updated successfully!");
      navigate({ to: "/warehouse-partners" });
    },
  });

  const handleFinish = async (values) => {
    const imagesBase64 = await Promise.all(
      fileList.map((file) => getBase64(file.originFileObj))
    );

    const payload = {
      ...values,
      property_images: imagesBase64,
    };
    handleFormSubmission({
      form,
      schema: updateWarehousePartnerSchema,
      onSubmit: (data) => mutate({ id, data }),
      values: payload,
    });
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouse Partners", href: "/warehouse-partners" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard loading={isLoading} title="Edit Warehouse Partner">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          disabled={isPending}
        >
          <WarehousePartnerForm fileList={fileList} setFileList={setFileList} />

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => navigate({ to: "/warehouse-partners" })}
              htmlType="reset"
            >
              Cancel
            </Button>
            <Button loading={isPending} type="primary" htmlType="submit">
              Update Application
            </Button>
          </div>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}
