/* eslint-disable react/prop-types */
import { Form, Button } from "antd";
import CourierPartnerFormItems from "./CourierPartnerFormItems";

export default function EditCourierPartnerForm({
  loading,
  form,
  handleSubmit,
}) {
  return (
    <Form
      disabled={loading}
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      <CourierPartnerFormItems />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-x-4 mt-6">
        <Button htmlType="reset">Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button>
      </div>
    </Form>
  );
}
