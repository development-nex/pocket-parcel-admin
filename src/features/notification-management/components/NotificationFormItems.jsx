import { Form, Input, Select, DatePicker, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";

const { TextArea } = Input;

const NotificationFormItems = () => {
  const [audience, setAudience] = useState("ALL_USERS");
  return (
    <>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input placeholder="Enter notification title" className="rounded-lg" />
      </Form.Item>

      <Form.Item label="Message" name="message" rules={[{ required: true }]}>
        <TextArea
          rows={4}
          placeholder="Enter your message..."
          className="rounded-lg"
        />
      </Form.Item>

      {/* Notification Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item label="Type" name="type" initialValue="GENERAL">
          <Select
            options={[
              { value: "GENERAL", label: "General" },
              { value: "ORDER_UPDATE", label: "Order Update" },
              { value: "DELIVERY_UPDATE", label: "Delivery Update" },
              { value: "PROMOTION", label: "Promotion" },
              { value: "SYSTEM", label: "System" },
              { value: "ALERT", label: "Alert" },
              { value: "REMINDER", label: "Reminder" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Priority" name="priority" initialValue="NORMAL">
          <Select
            options={[
              { value: "LOW", label: "Low" },
              { value: "NORMAL", label: "Normal" },
              { value: "HIGH", label: "High" },
              { value: "URGENT", label: "Urgent" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Target Audience"
          name="targetAudience"
          initialValue="ALL_USERS"
        >
          <Select
            onChange={setAudience}
            options={[
              { value: "ALL_USERS", label: "All Users" },
              { value: "SPECIFIC_USERS", label: "Specific Users" },
              { value: "SEGMENTS", label: "Segments" },
              { value: "FILTERS", label: "Filters" },
            ]}
          />
        </Form.Item>
        {/* Dynamic Fields */}
        {audience === "SPECIFIC_USERS" && (
          <Form.Item label="Target User IDs" name="targetUserIds">
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Enter user IDs"
            />
          </Form.Item>
        )}

        {audience === "SEGMENTS" && (
          <Form.Item label="Target Segments" name="targetSegments">
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Enter user segments"
            />
          </Form.Item>
        )}
        {/* Image Upload */}
        <Form.Item label="Notification Image" name="imageUrl">
          <Upload showUploadList={true} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* Action URL */}
        <Form.Item label="Action URL" name="actionUrl">
          <Input placeholder="app://navigate/route" className="rounded-lg" />
        </Form.Item>

        {/* Scheduled Notification */}
        <Form.Item label="Schedule For" name="scheduledFor">
          <DatePicker
            showTime
            className="w-full"
            format="YYYY-MM-DD HH:mm:ss"
            minDate={dayjs()}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default NotificationFormItems;
