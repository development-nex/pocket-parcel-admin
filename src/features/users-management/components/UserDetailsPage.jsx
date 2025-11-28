/* eslint-disable react/prop-types */
import { Descriptions, Tag, Avatar } from "antd";
import {
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

export default function UserDetailsPage({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar
          size={64}
          src={data?.avatar}
          icon={<UserOutlined />}
          className="shadow"
        />
        <div>
          <h2 className="text-xl font-semibold">{data?.full_name}</h2>
          <p className="text-gray-500 text-sm">{data?.role}</p>
        </div>
      </div>
      <Descriptions
        bordered
        column={{ xs: 1, sm: 1, md: 2 }}
        labelStyle={{ fontWeight: "600" }}
      >
        <Descriptions.Item label="Phone">
          +{data?.country_code} {data?.phone_number}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          {data?.email || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <Tag color={data?.status === "ACTIVE" ? "green" : "red"}>
            {data?.status}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Verified">
          {data?.is_verified ? (
            <Tag
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              color="success"
            >
              Verified
            </Tag>
          ) : (
            <Tag
              icon={<CloseCircleTwoTone twoToneColor="#f5222d" />}
              color="error"
            >
              Not Verified
            </Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Verified At">
          {data?.verified_at
            ? new Date(data?.verified_at).toLocaleString()
            : "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Address">
          {data?.address || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="City">
          {data?.city || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="State">
          {data?.state || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Pincode">
          {data?.pincode || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
