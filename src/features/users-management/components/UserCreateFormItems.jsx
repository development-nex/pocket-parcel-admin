/* eslint-disable react/prop-types */
import { Form, Input, Select } from "antd";

const { Option } = Select;

export default function UserCreateFormItems() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Form.Item
        label="Full Name"
        name="full_name"
        rules={[{ required: true, message: "Full name is required" }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item label="Country Code" name="country_code" initialValue="91">
        <Input placeholder="91" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone_number"
        rules={[{ required: true, message: "Phone number is required" }]}
      >
        <Input placeholder="9876543211" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder="••••••••" />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Role is required" }]}
        initialValue="CUSTOMER"
      >
        <Select placeholder="Select role">
          <Option value="CUSTOMER">Customer</Option>
          <Option value="ADMIN">Admin</Option>
          <Option value="MANAGER">Manager</Option>
          <Option value="SUPPORT">Support</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "City is required" }]}
      >
        <Input placeholder="Enter city" />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "State is required" }]}
      >
        <Input placeholder="Enter state" />
      </Form.Item>
    </div>
  );
}
