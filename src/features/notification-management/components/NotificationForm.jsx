import { Form, Button } from "antd";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { createNotificationSchema } from "../notification-management.schema";
import dayjs from "dayjs";
import { useCreateNotificationManagement } from "../notification-management.query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import NotificationFormItems from "./NotificationFormItems";

export default function NotificationForm() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateNotificationManagement({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notification-management"]);
      message.success("Successfully created the notification");
      navigate({ to: "/notification-management" });
    },
  });

  const submitForm = (values) => {
    const payload = {
      ...values,
      scheduledFor: values.scheduledFor
        ? dayjs(values.scheduledFor).toISOString()
        : undefined,
    };
    handleFormSubmission({
      values: payload,
      schema: createNotificationSchema,
      form,
      onSubmit: mutate,
    });
  };

  return (
    <Form layout="vertical" form={form} onFinish={submitForm}>
      <NotificationFormItems />

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button htmlType="reset">Reset</Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Create Notification
        </Button>
      </div>
    </Form>
  );
}
