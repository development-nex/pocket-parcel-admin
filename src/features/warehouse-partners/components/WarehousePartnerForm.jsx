/* eslint-disable react/prop-types */
import { Form, Input, Switch, Select, Upload, Row, Col } from "antd";
import {
  PlusOutlined,
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

// --- MAIN FORM COMPONENT ---

export default function WarehousePartnerForm({ fileList, setFileList }) {
  return (
    <Row gutter={48}>
      {/* --- LEFT COLUMN --- */}
      <Col md={24} lg={14} className="space-y-8">
        {/* SECTION 1: CONTACT */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold uppercase tracking-wider text-xs">
            <UserOutlined /> Contact Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <Form.Item
              label="Full Name"
              name="full_name"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input
                placeholder="Full Name"
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[{ required: true, message: "Required" }]}
              className="mb-0"
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email_address"
              className="md:col-span-2 mb-0"
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
          </div>
        </section>

        {/* SECTION 2: ADDRESS */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold uppercase tracking-wider text-xs">
            <EnvironmentOutlined /> Location Details
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
            <Form.Item
              label="Full Address"
              name="full_address"
              rules={[{ required: true }]}
              className="mb-0"
            >
              <TextArea rows={2} placeholder="Street Address / Building Name" />
            </Form.Item>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true }]}
                className="mb-0"
              >
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true }]}
                className="mb-0"
              >
                <Input placeholder="State" />
              </Form.Item>
              <Form.Item
                label="Postal code"
                name="postal_code"
                rules={[{ required: true }]}
                className="mb-0"
              >
                <Input placeholder="Zip Code" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true }]}
                className="mb-0"
              >
                <Input placeholder="Country" />
              </Form.Item>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROPERTY SPECS */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold uppercase tracking-wider text-xs">
            <HomeOutlined /> Property Specs
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
            <Form.Item
              name="property_type"
              rules={[{ required: true }]}
              label={<span className="text-gray-500 text-sm">Type</span>}
              className="mb-0"
            >
              <Select placeholder="Select Type">
                <Option value="WAREHOUSE">Warehouse</Option>
                <Option value="GODOWN">Godown</Option>
                <Option value="INDUSTRIAL">Industrial</Option>
                <Option value="COMMERCIAL">Commercial</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="available_space_size"
              rules={[{ required: true }]}
              label={
                <span className="text-gray-500 text-sm">Size (sq ft)</span>
              }
              className="mb-0"
            >
              <Input placeholder="e.g. 5000" suffix="sq ft" />
            </Form.Item>

            <Form.Item
              name="availability_timeline"
              rules={[{ required: true }]}
              label={
                <span className="text-gray-500 text-sm">Availability</span>
              }
              className="md:col-span-2 mb-0"
            >
              <Select placeholder="When is it available?">
                <Option value="IMMEDIATELY">Immediately</Option>
                <Option value="1_MONTH">Within 1 month</Option>
                <Option value="3_MONTHS">Within 3 months</Option>
                <Option value="6_MONTHS">Within 6 months</Option>
              </Select>
            </Form.Item>
          </div>
        </section>
      </Col>

      {/* --- RIGHT COLUMN --- */}
      <Col md={24} lg={10} className="space-y-8 mt-8 lg:mt-0">
        {/* SECTION 4: FEATURES */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold uppercase tracking-wider text-xs">
            <SafetyCertificateOutlined /> Access & Features
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <Form.Item
              name="ground_floor_access"
              rules={[{ required: true }]}
              label={"Ground Floor Access"}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item
              name="direct_road_access"
              rules={[{ required: true }]}
              label={"Direct Road Access"}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item
              name="parking_loading_area_available"
              rules={[{ required: true }]}
              label={"Parking / Loading Bay"}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item
              name="prior_rental_experience"
              rules={[{ required: true }]}
              label={"Prior Experience"}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>

          {/* Conditional Experience Box */}
          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) =>
              prev.prior_rental_experience !== curr.prior_rental_experience
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("prior_rental_experience") && (
                <div className="mt-4 animate-fade-in">
                  <Form.Item
                    name="rental_experience_details"
                    rules={[
                      {
                        required: true,
                        message: "Please provide details",
                      },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Please describe your previous rental experience..."
                      className="bg-yellow-50 border-yellow-200 focus:border-yellow-400 text-sm"
                    />
                  </Form.Item>
                </div>
              )
            }
          </Form.Item>
        </section>

        {/* SECTION 5: IMAGES */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold uppercase tracking-wider text-xs">
            <CloudUploadOutlined /> Property Gallery
          </div>
          <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center hover:bg-white hover:border-indigo-300 transition-colors">
            <Form.Item className="mb-0">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setFileList(fileList)}
                multiple
                className="avatar-uploader"
              >
                {fileList?.length < 6 && (
                  <div>
                    <PlusOutlined className="text-2xl text-gray-400 mb-2" />
                    <div className="text-gray-500 text-xs">Upload Photo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <div className="mt-2 text-xs text-gray-400">
              Supported: JPG, PNG (Max 6 images)
            </div>
          </div>
        </section>
      </Col>
    </Row>
  );
}
