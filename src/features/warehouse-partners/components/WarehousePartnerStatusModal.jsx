/* eslint-disable react/prop-types */
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { Input, Form, Modal } from "antd";
import { partnerStatusUpdateSchema } from "../warehouse-partners.schema";
import { useUpdateWarehousePartnerStatus } from "../warehouse-partners.query";
import { useQueryClient } from "@tanstack/react-query";

const WarehousePartnerStatusModal = ({ handleClose, data }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isPending } = useUpdateWarehousePartnerStatus({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["warehouse-partners", data?.id]);
      form.resetFields();
      handleClose();
    },
  });
  const handleSubmit = (values) => {
    const payload = {
      status: data?.status,
      review_notes: values?.review_notes,
    };
    handleFormSubmission({
      form,
      schema: partnerStatusUpdateSchema,
      onSubmit: (parsedData) =>
        mutate({
          id: data?.id,
          data: parsedData,
        }),
      values: payload,
    });
  };
  return (
    <Modal
      open={data?.open}
      title="Update Status"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
        loading: isPending,
      }}
      onCancel={handleClose}
      destroyOnHidden
      modalRender={(dom) => (
        <Form
          disabled={isPending}
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
          clearOnDestroy
          onFinish={(values) => handleSubmit(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name="review_notes" label="Review Notes">
        <Input.TextArea />
      </Form.Item>
    </Modal>
  );
};

export default WarehousePartnerStatusModal;
