/* eslint-disable react/prop-types */
import { Tag, Image, Descriptions, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { removeUnderscores } from "@/utils/typography.util";

export default function WarehousePartnerDetails({ data }) {
  const partner = data;

  const statusColors = {
    APPROVED: "green",
    PENDING_REVIEW: "blue",
    REJECTED: "red",
    SUSPENDED: "volcano",
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {partner?.full_name}
          </h1>
          <p className="text-gray-500">{partner?.property_type}</p>
        </div>

        <div className="flex gap-2 items-center">
          <Tag
            color={statusColors[partner?.status]}
            className="text-md px-4 py-1 rounded-full"
          >
            {removeUnderscores(partner?.status)}
          </Tag>
        </div>
      </div>

      <Divider orientation="left">Contact Information</Divider>

      {/* CONTACT SECTION */}
      <Descriptions bordered column={2} size="small" className="mb-6">
        <Descriptions.Item
          label={
            <span>
              <PhoneOutlined /> Phone
            </span>
          }
        >
          {partner?.phone_number}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <MailOutlined /> Email
            </span>
          }
        >
          {partner?.email_address}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <EnvironmentOutlined /> City
            </span>
          }
        >
          {partner?.city}, {partner?.state}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <HomeOutlined /> Full Address
            </span>
          }
        >
          {partner?.full_address}
        </Descriptions.Item>

        <Descriptions.Item label="Country">
          {partner?.country}
        </Descriptions.Item>

        <Descriptions.Item label="Postal Code">
          {partner?.postal_code}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Property Details</Divider>

      {/* PROPERTY DETAILS */}
      <Descriptions bordered column={2} size="small" className="mb-6">
        <Descriptions.Item label="Property Type">
          {partner?.property_type}
        </Descriptions.Item>

        <Descriptions.Item label="Available Space">
          {partner?.available_space_size} sq ft
        </Descriptions.Item>

        <Descriptions.Item label="Availability">
          {partner?.availability_timeline}
        </Descriptions.Item>

        <Descriptions.Item label="Rental Experience">
          {partner?.prior_rental_experience ? (
            <Tag icon={<CheckCircleOutlined />} color="green">
              YES
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="red">
              NO
            </Tag>
          )}
        </Descriptions.Item>

        {partner?.rental_experience_details && (
          <Descriptions.Item label="Experience Details" span={2}>
            {partner?.rental_experience_details}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider orientation="left">Access Features</Divider>

      {/* ACCESS FEATURES */}
      <Descriptions bordered column={3} size="small" className="mb-6">
        <Descriptions.Item label="Ground Floor Access">
          {partner?.ground_floor_access ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Direct Road Access">
          {partner?.direct_road_access ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Parking / Loading">
          {partner?.parking_loading_area_available ? (
            <Tag color="green">AVAILABLE</Tag>
          ) : (
            <Tag color="red">NOT AVAILABLE</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>

      {/* IMAGES */}
      <Divider orientation="left">Property Images</Divider>
      <div>
        {partner?.property_images?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {partner?.property_images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="Property"
                height={150}
                className="object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No images available</p>
        )}
      </div>
    </div>
  );
}
