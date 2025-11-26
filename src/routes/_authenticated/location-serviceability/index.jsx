import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import { useGetLocationServiceability } from "@/features/location-serviceability/location-serviceability.query";
import { removeUnderscores } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Space } from "antd";
import { Tooltip } from "antd";
import { Badge } from "antd";
import { Tag } from "antd";
import { Table } from "antd";

export const Route = createFileRoute(
  "/_authenticated/location-serviceability/"
)({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetLocationServiceability({
    limit,
    page,
  });
  if (isError) {
    return <ErrorFallback error={error} />;
  }

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
      render: (val) =>
        val ? (
          <Badge status="success" text="Yes" />
        ) : (
          <Badge status="error" text="No" />
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
      title: "Operational Hours",
      dataIndex: "operational_hours",
      render: (hours) => {
        if (!hours) return <Tag color="default">Not Provided</Tag>;

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
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      render: (status) =>
        status === "ACTIVE" ? (
          <Tag color="green">ACTIVE</Tag>
        ) : (
          <Tag color="red">INACTIVE</Tag>
        ),
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
          loading={isLoading}
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
