/* eslint-disable react/prop-types */

import { Tag, Badge, Divider, Descriptions } from "antd";

export default function LocationDetails({ data }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="size-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
          📍
        </div>
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {data?.location_name}
        </h2>
      </div>

      <div className="text-gray-600 mb-6  flex items-center gap-2">
        <span className="text-gray-400">🌍</span>
        {data?.city}, {data?.state}, {data?.country} —{" "}
        <span className="font-semibold text-blue-600">{data?.pincode}</span>
      </div>
      <Descriptions column={2} bordered size="small" className="mb-6 shadow-sm">
        <Descriptions.Item label="Latitude">{data?.latitude}</Descriptions.Item>
        <Descriptions.Item label="Longitude">
          {data?.longitude}
        </Descriptions.Item>
        <Descriptions.Item label="Radius (km)">
          {data?.radius_km}
        </Descriptions.Item>

        <Descriptions.Item label="Serviceable">
          {data?.is_serviceable ? (
            <Badge status="success" text="Yes" />
          ) : (
            <Badge status="error" text="No" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Priority">
          <Tag color="purple">{data?.priority}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Estimated Days">
          {data?.estimated_days}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Service Types">
          <div className="flex gap-2 flex-wrap ">
            {data?.service_types?.map((type) => (
              <Tag key={type} color="blue" className="text-sm px-3 py-1">
                {type}
              </Tag>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Availability">
          <div className="flex gap-3 flex-wrap">
            <Tag
              color={data?.cod_available ? "green" : "red"}
              className="text-sm px-3 py-1"
            >
              💵 COD
            </Tag>
            <Tag
              color={data?.pickup_available ? "green" : "red"}
              className="text-sm px-3 py-1"
            >
              📦 Pickup
            </Tag>
            <Tag
              color={data?.delivery_available ? "green" : "red"}
              className="text-sm px-3 py-1"
            >
              🚚 Delivery
            </Tag>
          </div>
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Coverage Notes">
          {data?.coverage_notes}
        </Descriptions.Item>
        <Descriptions.Item span={2} label="Status">
          <Tag
            color={data?.status === "ACTIVE" ? "green" : "red"}
            className="text-base px-4 py-2 font-semibold"
          >
            {data?.status}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider
        orientation="left"
        className="text-lg font-semibold text-gray-700"
      >
        🕐 Operational Hours
      </Divider>

      {data?.operational_hours ? (
        <Descriptions bordered column={1} size="small" className="shadow-sm ">
          {Object.entries(data?.operational_hours).map(([day, time]) => (
            <Descriptions.Item
              key={day}
              label={day.charAt(0).toUpperCase() + day.slice(1)}
            >
              {time}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ) : (
        <Tag color="default" className="mb-6">
          Not Provided
        </Tag>
      )}
    </div>
  );
}
