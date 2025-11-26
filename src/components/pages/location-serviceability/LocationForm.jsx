import SelectLocationModal from "@/components/ui/maps/SelectLocationModal";
import { useCreateLocationServiceability } from "@/features/location-serviceability/location-serviceability.query";
import { createLocationServiceabilitySchema } from "@/features/location-serviceability/location-serviceability.schema";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { Space } from "antd";
import { Form, Input, Switch, InputNumber, Button, Divider } from "antd";

const { TextArea } = Input;

export default function LocationForm() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const weeks = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const { mutate, isPending } = useCreateLocationServiceability({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["location-serviceability"]);
      form.resetFields();
      message.success("Location created successfully");
      navigate({ to: "/location-serviceability" });
    },
    onError: () => {},
  });
  const onSubmit = async (values) => {
    handleFormSubmission({
      values,
      schema: createLocationServiceabilitySchema,
      form,
      onSubmit: mutate,
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      //   initialValues={initialData}
      onFinish={onSubmit}
      disabled={isPending}
    >
      <Divider style={{ marginY: "12px" }} orientation="center">
        Basic Info
      </Divider>
      {/* Basic Information Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Form.Item
          label={
            <span className="font-medium text-gray-700">Location Name</span>
          }
          name="location_name"
          className="mb-4"
        >
          <Input placeholder="Enter location name" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium text-gray-700">City</span>}
          name="city"
          className="mb-4"
        >
          <Input placeholder="City" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium text-gray-700">State</span>}
          name="state"
          className="mb-4"
        >
          <Input placeholder="State" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium text-gray-700">Country</span>}
          name="country"
          className="mb-4"
        >
          <Input placeholder="Country" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label={<span className="font-medium text-gray-700">Pincode</span>}
          name="pincode"
          className="mb-4"
        >
          <Input placeholder="Pincode" className="rounded-lg" />
        </Form.Item>

        <Space className="col-span-2">
          <Form.Item
            label={<span className="font-medium text-gray-700">Latitude</span>}
            name="latitude"
            className="mb-4"
          >
            <InputNumber
              className="w-full! rounded-lg"
              placeholder="Latitude"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-gray-700">Longitude</span>}
            name="longitude"
            className="mb-4"
          >
            <InputNumber
              className="w-full! rounded-lg"
              placeholder="Longitude"
            />
          </Form.Item>

          <SelectLocationModal
            form={form}
            latitude={"latitude"}
            longitude={"longitude"}
          />
        </Space>

        <Form.Item
          label={<span className="font-medium text-gray-700">Radius (km)</span>}
          name="radius_km"
          className="mb-4"
        >
          <InputNumber className="w-full rounded-lg" placeholder="Radius" />
        </Form.Item>
      </div>
      <Divider style={{ marginY: "12px" }} orientation="center">
        Service Configuration
      </Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-2 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <Form.Item
            label={
              <span className="font-medium text-gray-700">Is Serviceable?</span>
            }
            name="is_serviceable"
            valuePropName="checked"
            className="mb-0"
          >
            <Switch className="mt-2" />
          </Form.Item>
        </div>

        <div className="p-2 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <Form.Item
            label={
              <span className="font-medium text-gray-700">COD Available?</span>
            }
            name="cod_available"
            valuePropName="checked"
            className="mb-0"
          >
            <Switch className="mt-2" />
          </Form.Item>
        </div>

        <div className="p-2 bg-linear-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
          <Form.Item
            label={
              <span className="font-medium text-gray-700">
                Pickup Available?
              </span>
            }
            name="pickup_available"
            valuePropName="checked"
            className="mb-0"
          >
            <Switch className="mt-2" />
          </Form.Item>
        </div>

        <div className="p-2 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <Form.Item
            label={
              <span className="font-medium text-gray-700">
                Delivery Available?
              </span>
            }
            name="delivery_available"
            valuePropName="checked"
            className="mb-0"
          >
            <Switch className="mt-2" />
          </Form.Item>
        </div>
      </div>
      <Divider style={{ marginY: "12px" }} orientation="center">
        Operational Hours Card
      </Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4">
        {weeks.map((day) => (
          <div
            key={day}
            className="p-2 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all"
          >
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              }
              name={["operational_hours", day]}
              className="mb-0"
            >
              <Input
                placeholder="e.g. 9:00-19:00 or Closed"
                className="rounded-lg mt-2"
              />
            </Form.Item>
          </div>
        ))}
      </div>
      <Form.Item
        label={
          <span className="font-medium text-gray-700">Coverage Notes</span>
        }
        name="coverage_notes"
        // className="my-4"
      >
        <TextArea
          rows={4}
          placeholder="Enter coverage notes and special instructions..."
          className="rounded-lg"
        />
      </Form.Item>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          htmlType="reset"
          onClick={() => navigate({ to: "/location-serviceability" })}
        >
          Cancel
        </Button>
        <Button loading={isPending} type="primary" htmlType="submit">
          Save Location
        </Button>
      </div>
    </Form>
  );
}
