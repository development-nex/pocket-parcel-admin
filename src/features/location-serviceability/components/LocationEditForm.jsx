import SelectLocationModal from "@/components/ui/maps/SelectLocationModal";
import {
  useGetLocationServiceabilityById,
  useUpdateLocationServiceability,
} from "@/features/location-serviceability/location-serviceability.query";
import { updateLocationServiceabilitySchema } from "@/features/location-serviceability/location-serviceability.schema";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  message,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Divider,
  Space,
} from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

export default function LocationEditForm() {
  const { id } = useParams({ strict: false }); // /location-serviceability/edit?id=xxxx
  const queryClient = useQueryClient();
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

  const [form] = Form.useForm();

  // 👉 Fetch existing location
  const { data, isLoading } = useGetLocationServiceabilityById(id);
  // 👉 Update mutation
  const { mutate, isPending } = useUpdateLocationServiceability({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["location-serviceability"]);
      message.success("Location updated successfully");
      navigate({ to: "/location-serviceability" });
    },
    onError: () => message.error("Update failed"),
  });

  // Pre-fill the data into the form
  const location = data?.data?.location;

  useEffect(() => {
    if (location) {
      form.setFieldsValue(location);
    }
  }, [location, form]);

  const onSubmit = (values) => {
    const updatedValues = {
      ...values,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      radius_km: Number(values.radius_km),
    };
    handleFormSubmission({
      values: { params: { id }, body: updatedValues },
      schema: updateLocationServiceabilitySchema,
      form,
      onSubmit: (data) => mutate({ data, id }),
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      disabled={isPending || isLoading}
    >
      <Divider orientation="center">Basic Info</Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Form.Item
          name="location_name"
          label={
            <span className="font-medium text-gray-700">Location Name</span>
          }
        >
          <Input placeholder="Enter location name" />
        </Form.Item>

        <Form.Item name="city" label="City">
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Input placeholder="State" />
        </Form.Item>

        <Form.Item name="country" label="Country">
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item name="pincode" label="Pincode">
          <Input placeholder="Pincode" />
        </Form.Item>

        <Space className="col-span-2">
          <Form.Item name="latitude" label="Latitude">
            <InputNumber className="w-full" placeholder="Latitude" />
          </Form.Item>

          <Form.Item name="longitude" label="Longitude">
            <InputNumber className="w-full" placeholder="Longitude" />
          </Form.Item>

          <SelectLocationModal
            form={form}
            latitude="latitude"
            longitude="longitude"
          />
        </Space>

        <Form.Item name="radius_km" label="Radius (km)">
          <InputNumber className="w-full" placeholder="Radius" />
        </Form.Item>
      </div>

      {/* ---------------------- SERVICE CONFIG ---------------------------------- */}
      <Divider orientation="center">Service Configuration</Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-2 rounded-xl border bg-green-50 border-green-200">
          <Form.Item
            name="is_serviceable"
            valuePropName="checked"
            label="Is Serviceable?"
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="p-2 rounded-xl border bg-blue-50 border-blue-200">
          <Form.Item
            name="cod_available"
            valuePropName="checked"
            label="COD Available?"
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="p-2 rounded-xl border bg-orange-50 border-orange-200">
          <Form.Item
            name="pickup_available"
            valuePropName="checked"
            label="Pickup Available?"
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="p-2 rounded-xl border bg-purple-50 border-purple-200">
          <Form.Item
            name="delivery_available"
            valuePropName="checked"
            label="Delivery Available?"
          >
            <Switch />
          </Form.Item>
        </div>
      </div>

      {/* ---------------------- OPERATIONAL HOURS ----------------------------- */}
      <Divider orientation="center">Operational Hours</Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4">
        {weeks.map((day) => (
          <div
            key={day}
            className="p-2 rounded-xl border bg-gray-50 hover:border-blue-300 transition"
          >
            <Form.Item
              name={["operational_hours", day]}
              label={day.charAt(0).toUpperCase() + day.slice(1)}
            >
              <Input placeholder="9:00-19:00 or Closed" />
            </Form.Item>
          </div>
        ))}
      </div>

      <Form.Item name="coverage_notes" label="Coverage Notes">
        <TextArea rows={4} placeholder="Enter coverage notes..." />
      </Form.Item>

      {/* ---------------------- ACTION BUTTONS ----------------------------- */}
      <div className="flex justify-end gap-4 mt-4">
        <Button onClick={() => navigate({ to: "/location-serviceability" })}>
          Cancel
        </Button>

        <Button loading={isPending} type="primary" htmlType="submit">
          Update Location
        </Button>
      </div>
    </Form>
  );
}
