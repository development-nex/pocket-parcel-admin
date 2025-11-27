import { Form, Button, message } from "antd";
import { useCreateCourierPartner } from "../courier-partners.query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { applyZodErrorsToForm } from "@/utils/formError.util";
import { createCourierPartnerSchema } from "../courier-partners.schema";
import CourierPartnerFormItems from "./CourierPartnerFormItems";

export default function CourierPartnerForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate, isPending } = useCreateCourierPartner({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["courier-partners"]);
      message.success("Courier Partner created successfully");
      form.resetFields();
      navigate({ to: "/courier-partners" });
    },
  });

  // Form submit
  const submitForm = (values) => {
    try {
      const payload = createCourierPartnerSchema.parse(values);
      mutate(payload);
    } catch (err) {
      console.log("err", err);
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        console.log(err);
        message.error("Fix the errors and try again.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  return (
    <Form
      disabled={isPending}
      layout="vertical"
      form={form}
      onFinish={submitForm}
    >
      <CourierPartnerFormItems />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-x-4 mt-6">
        <Button htmlType="reset">Reset</Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Save
        </Button>
      </div>
    </Form>
  );
}
