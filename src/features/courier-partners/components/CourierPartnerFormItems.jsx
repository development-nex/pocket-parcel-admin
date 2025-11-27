import axiosInstance from "@/utils/axiosInstance.util";
import { UploadOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { message } from "antd";
import { Input } from "antd";
import { Upload } from "antd";
import { InputNumber } from "antd";
import { Switch } from "antd";
import { Form } from "antd";
import { useState } from "react";
const { TextArea } = Input;
const CourierPartnerFormItems = () => {
  const [uploading, setUploading] = useState(false);
  // S3 Upload Handler
  const handleLogoUpload = async ({ file }) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axiosInstance.post("/upload/s3", formData);

      if (data?.url) {
        message.success("Logo uploaded successfully!");
      }
    } catch (err) {
      message.error("Failed to upload logo");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      {/* BASIC INFO */}
      <Divider size="small" orientation="left">
        Basic Information
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Form.Item
          label="Courier Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter courier name" />
        </Form.Item>

        <Form.Item
          label="Courier Code"
          name="code"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter courier code" />
        </Form.Item>

        {/* LOGO UPLOAD */}
        <Form.Item label="Logo" name="logo" className="md:col-span-2">
          <Upload.Dragger
            name="file"
            multiple={false}
            customRequest={handleLogoUpload}
            showUploadList={false}
            disabled={uploading}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined className="text-blue-600 text-3xl" />
            </p>
            <p className="ant-upload-text">Click or drag logo to upload</p>
            <p className="ant-upload-hint text-gray-500">
              PNG / JPG / SVG allowed.
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="md:col-span-2"
        >
          <TextArea rows={3} placeholder="Enter short description" />
        </Form.Item>
      </div>

      {/* CONTACT INFO */}
      <Divider size="small" orientation="left">
        Contact Information
      </Divider>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <Form.Item
          label="Contact Person"
          name="contact_person"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter contact person" />
        </Form.Item>

        <Form.Item
          label="Contact Email"
          name="contact_email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter contact email" />
        </Form.Item>

        <Form.Item
          label="Contact Phone"
          name="contact_phone"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter contact phone" />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="Enter website" />
        </Form.Item>
      </div>

      {/* API CONFIG */}
      <Divider size="small" orientation="left">
        API Configuration
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
        <Form.Item label="API Endpoint" name="api_endpoint">
          <Input placeholder="Enter API endpoint" />
        </Form.Item>

        <Form.Item label="API Key" name="api_key">
          <Input placeholder="Enter API key" />
        </Form.Item>

        <Form.Item label="API Secret" name="api_secret">
          <Input placeholder="Enter API secret" />
        </Form.Item>
      </div>

      {/* ADDITIONAL CONFIG */}
      <Divider size="small" orientation="left">
        Additional Configuration
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
        <Form.Item
          label="Max Weight (kg)"
          name={["additional_config", "max_weight_kg"]}
        >
          <InputNumber className="w-full!" placeholder="Max weight" />
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          label="COD Supported?"
          name={["additional_config", "supports_cod"]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          label="Reverse Pickup?"
          name={["additional_config", "supports_reverse_pickup"]}
        >
          <Switch />
        </Form.Item>
      </div>

      {/* STATUS */}
      <Divider size="small" orientation="left">
        Status
      </Divider>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
        <Form.Item valuePropName="checked" label="Active" name="is_active">
          <Switch />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <InputNumber
            className="w-full!"
            min={1}
            placeholder="Enter priority"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default CourierPartnerFormItems;
