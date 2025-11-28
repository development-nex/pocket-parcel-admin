/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import NotificationFormItems from "./NotificationFormItems";

const EditNotificationForm = ({ form, submitForm, isPending, navigate }) => {
  return (
    <Form layout="vertical" form={form} onFinish={submitForm}>
      <NotificationFormItems />

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button onClick={() => navigate({ to: "/notification-management" })}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Edit Notification
        </Button>
      </div>
    </Form>
  );
};

export default EditNotificationForm;
