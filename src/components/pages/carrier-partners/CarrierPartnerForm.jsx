/* eslint-disable react/prop-types */

import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Switch,
  Checkbox,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { TextArea } = Input;

const serviceOptions = [
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
  { label: "COD (Cash on Delivery)", value: "cod" },
  { label: "Reverse Logistics", value: "reverse" },
];

const stateOptions = [
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
].map((state) => ({ label: state, value: state }));

export default function CarrierPartnerForm({ onSubmit, loading }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    message.success("Carrier Partner Registered Successfully!");
    console.log("Submitted Values:", values);
    onSubmit?.(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <ResponsiveCard title="Add Carrier Partner">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ active: true }}
      >
        {/* Basic Info */}
        <Row gutter={16}>
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <Input placeholder="Enter carrier company name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="contactPerson"
              label="Contact Person"
              rules={[
                { required: true, message: "Please enter contact person" },
              ]}
            >
              <Input placeholder="Enter contact person name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="email"
              label="Contact Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input placeholder="Enter contact email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="phone"
              label="Contact Phone"
              rules={[
                { required: true, message: "Please enter phone number" },
                { len: 10, message: "Enter 10-digit phone number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="logo"
              label="Company Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Upload company logo (PNG/JPG)"
            >
              <Upload
                name="logo"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="gst" label="GST Number">
              <Input placeholder="Enter GST Number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Address Info */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <TextArea rows={3} placeholder="Enter complete address" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Enter city" }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Select state" }]}
            >
              <Select options={stateOptions} placeholder="Select state" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true, message: "Enter pincode" }]}
            >
              <Input placeholder="Enter pincode" />
            </Form.Item>
          </Col>
        </Row>

        {/* Business Info */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="serviceTypes"
              label="Service Types"
              rules={[{ required: true, message: "Select service types" }]}
            >
              <Checkbox.Group options={serviceOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="coverage" label="Service Coverage (States)">
              <Select
                mode="multiple"
                options={stateOptions}
                placeholder="Select states covered"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Status */}
        <Form.Item name="active" label="Active Status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        {/* Submit */}
        <Form.Item className="mt-4">
          <div className="flex gap-2">
            <Button htmlType="reset" loading={loading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register Carrier Partner
            </Button>
          </div>
        </Form.Item>
      </Form>
    </ResponsiveCard>
  );
}
