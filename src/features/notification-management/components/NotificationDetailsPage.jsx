/* eslint-disable react/prop-types */
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Tag, Typography, Space, Avatar } from "antd";

const { Title, Text } = Typography;

export default function NotificationDetailsPage({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        {data.image_url ? (
          <img
            src={data.image_url}
            alt="Notification Banner"
            className="size-14 object-cover rounded-lg shadow"
          />
        ) : (
          <Avatar shape="square" size={56}>
            N/A
          </Avatar>
        )}

        <div>
          <Title level={3} className="mb-0!">
            {data.title}
          </Title>
          <Text type="secondary">{data.type}</Text>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveCard title="Message" className="shadow-sm" size="small">
          <Text>{data.message}</Text>
        </ResponsiveCard>

        <ResponsiveCard
          title="Status"
          extra={
            <Tag color={data.status === "SENT" ? "green" : "red"}>
              {data.status}
            </Tag>
          }
          className="shadow-sm"
          size="small"
        >
          <div className="mt-2">
            <Text strong>Priority:</Text>{" "}
            <Tag
              color={
                data.priority === "HIGH"
                  ? "red"
                  : data.priority === "URGENT"
                  ? "volcano"
                  : "green"
              }
            >
              {data.priority}
            </Tag>
          </div>

          <div className="mt-2">
            <Text strong>Type:</Text> <Tag>{data.type}</Tag>
          </div>
        </ResponsiveCard>
      </div>

      {/* Target Information */}
      <ResponsiveCard
        className="shadow-sm"
        size="small"
        title="Target Audience"
      >
        <p>
          <Text strong>Target Type:</Text> {data.target_type}
        </p>

        {data.target_user_ids && (
          <p>
            <Text strong>Users:</Text> {data.target_user_ids.join(", ")}
          </p>
        )}

        {data.target_segments && (
          <p>
            <Text strong>Segments:</Text> {data.target_segments.join(", ")}
          </p>
        )}
      </ResponsiveCard>

      {/* Scheduling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsiveCard className="shadow-sm" title="Schedule" size="small">
          <p>
            <Text strong>Scheduled At:</Text>{" "}
            {data.scheduled_at
              ? new Date(data.scheduled_at).toLocaleString()
              : "—"}
          </p>

          <p className="mt-2">
            <Text strong>Sent At:</Text>{" "}
            {data.sent_at ? new Date(data.sent_at).toLocaleString() : "—"}
          </p>
        </ResponsiveCard>

        <ResponsiveCard className="shadow-sm" title="Creator Info" size="small">
          <p>
            <Text strong>Name:</Text> {data.creator?.full_name}
          </p>
          <p>
            <Text strong>Email:</Text> {data.creator?.email}
          </p>
          <p>
            <Text strong>Created At:</Text>{" "}
            {new Date(data.created_at).toLocaleString()}
          </p>
        </ResponsiveCard>
      </div>

      {/* Analytics */}
      <ResponsiveCard className="shadow-sm" size="small">
        <Title level={5}>Analytics</Title>

        <Space size="large" className="mt-3">
          <div>
            <Text strong>Total Recipients:</Text> {data.total_recipients}
          </div>
          <div>
            <Text strong>Successful Sends:</Text> {data.successful_sends}
          </div>
          <div>
            <Text strong>Failed Sends:</Text> {data.failed_sends}
          </div>
          <div>
            <Text strong>Total Reads:</Text> {data.total_reads}
          </div>
          <div>
            <Text strong>Total Clicks:</Text> {data.total_clicks}
          </div>
        </Space>
      </ResponsiveCard>
    </div>
  );
}
