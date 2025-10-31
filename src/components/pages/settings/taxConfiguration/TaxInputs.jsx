/* eslint-disable react/prop-types */
import { Form, Input, Select, Button, message } from "antd";
import { z } from "zod";

// Validation schema (same as before)
const taxSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  tax_code: z.string().min(1, { message: "Tax Code is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  rate_name_1: z.string().min(1, { message: "Rate Name is required" }),
  rate_value_1: z.string().min(1, { message: "Rate Value is required" }),
});

// Type options
const typeOptions = [
  { label: "Single", value: "single" },
  { label: "Multiple", value: "multiple" },
  { label: "Compound", value: "compound" },
];

const TaxInputs = ({ handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Validate against Zod schema
    const parsed = taxSchema.safeParse(values);

    if (!parsed.success) {
      // Set AntD field errors from Zod validation
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const formatted = Object.keys(fieldErrors).map((field) => ({
        name: field,
        errors: [fieldErrors[field][0]],
      }));
      form.setFields(formatted);
      return;
    }

    console.log("✅ Submitted Data:", parsed.data);
    message.success("Tax added successfully!");
    handleOk?.();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: "",
        tax_code: "",
        type: "single",
        rate_name_1: "",
        rate_value_1: "",
      }}
      className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder="Enter tax name" size="large" />
      </Form.Item>

      <Form.Item
        label="Tax Code"
        name="tax_code"
        rules={[{ required: true, message: "Tax Code is required" }]}
      >
        <Input placeholder="Enter tax code" size="large" />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        className="col-span-2"
        rules={[{ required: true, message: "Type is required" }]}
      >
        <Select options={typeOptions} placeholder="Select type" size="large" />
      </Form.Item>

      <div className="bg-gray-100 rounded-md border p-2 col-span-2">
        <p className="text-sm">
          Add rates to this class. You can add up to 3 rates that either add up
          or compound depending on the option selected above.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Form.Item
            label="Rate Name 1"
            name="rate_name_1"
            rules={[{ required: true, message: "Rate Name is required" }]}
          >
            <Input placeholder="Enter rate name" size="large" />
          </Form.Item>

          <Form.Item
            label="Value in %"
            name="rate_value_1"
            rules={[{ required: true, message: "Value is required" }]}
          >
            <Input placeholder="Enter value" size="large" />
          </Form.Item>
        </div>
      </div>

      <div className="flex justify-between gap-2 border-t border-gray-200 pt-3 col-span-2">
        <small className="text-gray-600 text-sm">
          Order item prices are inclusive of taxes by default
        </small>

        <div className="flex gap-2">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default TaxInputs;
