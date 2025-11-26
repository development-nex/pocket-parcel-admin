import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useGetLocationServiceability,
  useToggleLocationServiceability,
} from "@/features/location-serviceability/location-serviceability.query";
import { removeUnderscores } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Space } from "antd";
import { message } from "antd";
import { Switch } from "antd";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { Table } from "antd";

export const Route = createFileRoute(
  "/_authenticated/location-serviceability/"
)({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetLocationServiceability({
    limit,
    page,
  });

  const { mutate: toggleMutate, isPending: isTogglePending } =
    useToggleLocationServiceability({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["location-serviceability"]);
        message.success("Location updated successfully");
        navigate({ to: "/location-serviceability" });
      },
    });

  const handleToggle = (record) => {
    const data = {
      is_serviceable: record?.is_serviceable === true ? false : true,
    };
    toggleMutate({
      id: record?.id,
      data,
    });
  };

  const columns = [
    {
      title: "Location",
      dataIndex: "location_name",
      key: "location_name",
      render: (text, record) => (
        <div>
          <div className="font-medium text-blue-600">{text}</div>
          <div className="text-sm text-gray-500">
            {record.city}, {record.state}, {record.country}
          </div>
        </div>
      ),
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
    },
    {
      title: "Serviceable",
      dataIndex: "is_serviceable",
      render: (_, record) => (
        <Switch
          value={record.is_serviceable}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={() => handleToggle(record)}
        />
      ),
    },
    {
      title: "Service Types",
      dataIndex: "service_types",
      render: (types) =>
        types?.map((t) => (
          <Tag color="blue" key={t}>
            {removeUnderscores(t)}
          </Tag>
        )),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (v) => <Tag color="purple">{v}</Tag>,
    },
    {
      title: "COD",
      dataIndex: "cod_available",
      render: (val) =>
        val ? <Tag color="green">Available</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Pickup / Delivery",
      render: (record) => (
        <Space>
          <Tag color={record.pickup_available ? "green" : "red"}>Pickup</Tag>
          <Tag color={record.delivery_available ? "green" : "red"}>
            Delivery
          </Tag>
        </Space>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "ACTIVE" ? (
          <Tag color="green">ACTIVE</Tag>
        ) : (
          <Tag color="red">INACTIVE</Tag>
        ),
    },
    {
      title: "Operational Hours",
      dataIndex: "operational_hours",
      fixed: "right",
      render: (hours) => {
        if (!hours || Object.entries(hours).length === 0)
          return <Tag color="default">Not Provided</Tag>;

        return (
          <Tooltip
            title={
              <div className="text-xs leading-4">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day}>
                    <strong>{day}:</strong> {time}
                  </div>
                ))}
              </div>
            }
          >
            <Tag color="cyan">View Hours</Tag>
          </Tooltip>
        );
      },
    },
    // Actions
    {
      title: "Actions",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`${record.id}`}>
            <Button size="small" type="link">
              View
            </Button>
          </Link>
          <Link to={`${record.id}/edit`}>
            <Button size="small" type="link">
              Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Location Serviceability" },
      ]}
    >
      <ResponsiveCard
        title="Location Serviceability"
        extra={
          <Link to="create">
            <Button size="small" type="primary">
              Create
            </Button>
          </Link>
        }
      >
        <Table
          size="small"
          scroll={{ x: "max-content" }}
          loading={isLoading || isTogglePending}
          bordered
          columns={columns}
          dataSource={data?.data?.locations}
          rowKey={"id"}
          pagination={false}
        />

        <UrlPagination total={data?.data?.pagination?.total} />
      </ResponsiveCard>
    </PageLayout>
  );
}
