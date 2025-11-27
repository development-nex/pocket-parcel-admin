/* eslint-disable react/prop-types */

import { Tag, Divider, Descriptions, Tooltip } from "antd";
import {
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

export default function CourierPartnerDetails({ data }) {
  const config = data?.additional_config || {};

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-5">
        <img
          src={data?.logo}
          alt={data?.name}
          className="h-16 w-16 object-contain rounded-lg border shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-semibold text-blue-700">{data?.name}</h1>
          <p className="text-gray-500">{data?.description}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <Tag color="cyan" className="px-3 py-1 font-medium">
          {data?.code}
        </Tag>
        <Tag color={data?.is_active ? "green" : "red"} className="px-3 py-1">
          {data?.is_active ? "ACTIVE" : "INACTIVE"}
        </Tag>
        <Tag color="purple" className="px-3 py-1">
          Priority: {data?.priority}
        </Tag>
      </div>

      <Divider size="small" orientation="left">
        Contact Information
      </Divider>

      <Descriptions size="small" bordered column={1}>
        <Descriptions.Item label="Contact Person">
          <UserOutlined className="mr-2 text-gray-500" />
          {data?.contact_person}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          <MailOutlined className="mr-2 text-gray-500" />
          {data?.contact_email}
        </Descriptions.Item>

        <Descriptions.Item label="Phone">
          <PhoneOutlined className="mr-2 text-gray-500" />
          {data?.contact_phone}
        </Descriptions.Item>

        <Descriptions.Item label="Website">
          <a
            href={data?.website}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            <GlobalOutlined className="mr-2" />
            {data?.website}
          </a>
        </Descriptions.Item>
      </Descriptions>

      {/* API DETAILS */}
      <Divider size="small" orientation="left">
        API Information
      </Divider>

      <Descriptions size="small" bordered column={1}>
        <Descriptions.Item label="API Endpoint">
          <ApiOutlined className="mr-2 text-gray-500" />
          {data?.api_endpoint}
        </Descriptions.Item>

        <Descriptions.Item label="API Key">
          <Tooltip title={data?.api_key}>
            <span className="font-mono text-gray-800 truncate block">
              {data?.api_key}
            </span>
          </Tooltip>
        </Descriptions.Item>

        <Descriptions.Item label="API Secret">
          <Tooltip title={data?.api_secret}>
            <span className="font-mono text-gray-800 truncate block">
              {data?.api_secret}
            </span>
          </Tooltip>
        </Descriptions.Item>
      </Descriptions>

      {/* CONFIG */}
      <Divider size="small" orientation="left">
        Additional Configuration
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {config?.max_weight_kg && (
          <ResponsiveCard size="small" className="border border-gray-200">
            <div className="font-medium text-gray-600">Max Weight</div>
            <div className="text-blue-600 text-lg font-semibold">
              {config?.max_weight_kg} kg
            </div>
          </ResponsiveCard>
        )}

        <ResponsiveCard size="small" className="border border-gray-200">
          <div className="font-medium text-gray-600">COD Available</div>
          <Tag color={config?.supports_cod ? "green" : "red"}>
            {config?.supports_cod ? "Yes" : "No"}
          </Tag>
        </ResponsiveCard>

        <ResponsiveCard size="small" className="border border-gray-200">
          <div className="font-medium text-gray-600">Reverse Pickup</div>
          <Tag color={config?.supports_reverse_pickup ? "green" : "red"}>
            {config?.supports_reverse_pickup ? "Yes" : "No"}
          </Tag>
        </ResponsiveCard>

        {config?.coverage_cities && (
          <ResponsiveCard size="small" className="border border-gray-200">
            <div className="font-medium text-gray-600">Coverage Cities</div>
            <div className="text-blue-600 text-lg font-semibold">
              {config?.coverage_cities}
            </div>
          </ResponsiveCard>
        )}

        {Object.entries(config)
          .filter(
            ([key, val]) =>
              typeof val === "boolean" &&
              key !== "supports_cod" &&
              key !== "supports_reverse_pickup"
          )
          .map(([key, val]) => (
            <ResponsiveCard
              key={key}
              size="small"
              className="border border-gray-200"
            >
              <div className="font-medium text-gray-600">
                {key.replace(/_/g, " ")}
              </div>
              <Tag color={val ? "green" : "red"}>
                {val ? "Enabled" : "Disabled"}
              </Tag>
            </ResponsiveCard>
          ))}
      </div>
    </div>
  );
}
