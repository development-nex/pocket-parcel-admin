import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import { useGetAllUsers } from "@/features/users-management/users-management.query";
import { validatePagination } from "@/utils/validatePagination.util";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Tag } from "antd";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/users-management/")({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetAllUsers({ page, limit });
  const columns = [
    {
      title: "S.No.",
      render: (_, __, index) => page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => text || "N/A",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => text || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "ACTIVE" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "Is Verified",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (text) => (
        <Tag color={text ? "green" : "red"}>{text ? "Yes" : "No"}</Tag>
      ),
    },
    // Actions
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link to={`${record.id}`}>
            <Button size="small" type="link">
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Users Management" }]}
    >
      <ResponsiveCard
        title="Users Management"
        extra={
          <Link to="create">
            <Button size="small" type="primary">
              Create
            </Button>
          </Link>
        }
      >
        <Table
          loading={isLoading}
          size="small"
          columns={columns}
          dataSource={data?.data?.users}
          bordered
          pagination={false}
          scroll={{ x: "max-content" }}
        />

        <UrlPagination total={data?.data?.pagination?.total} />
      </ResponsiveCard>
    </PageLayout>
  );
}
