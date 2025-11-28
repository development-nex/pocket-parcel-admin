import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useDeleteWarehousePartner,
  useGetAllWarehousePartners,
} from "@/features/warehouse-partners/warehouse-partners.query";
import { removeUnderscores } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Modal } from "antd";
import { Space } from "antd";
import { Tag } from "antd";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/warehouse-partners/")({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});
// const columns = [
//   {
//     title: "S. No.",
//     render: (_, record, index) => index + 1,
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Type",
//     dataIndex: "warehouse_type",
//     key: "warehouse_type",
//   },
//   {
//     title: "Pincode",
//     dataIndex: "postal_code",
//     key: "postal_code",
//   },
//   {
//     title: "GST",
//     dataIndex: "gst_number",
//     key: "gst_number",
//   },
//   {
//     title: "Storage Capacity",
//     dataIndex: "capacity",
//     key: "capacity",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//   },
// ];
function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetAllWarehousePartners({
    page,
    limit,
  });

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteWarehousePartner({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["warehouse-partners"]);
      },
    });

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Would you like to delete this partner?",
      content:
        "The delete action will be permanent, and there will be no option to undo or reverse it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteMutate(id);
      },
    });
  };
  // ---- STATUS TAG COLORS ----
  const statusColors = {
    APPROVED: "green",
    PENDING_REVIEW: "blue",
    REJECTED: "red",
    SUSPENDED: "volcano",
  };

  // ---- TABLE COLUMNS ----
  const columns = [
    {
      title: "Partner",
      dataIndex: "full_name",
      key: "full_name",
      width: 200,
      fixed: "left",
      render: (name, record) => (
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{record.email_address}</p>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      width: 150,
      render: (_, record) => (
        <>
          <p className="text-gray-700">{record.phone_number}</p>
          <p className="text-xs text-gray-500">{record.city}</p>
        </>
      ),
    },
    {
      title: "Property Type",
      dataIndex: "property_type",
      key: "property_type",
      width: 150,
    },
    {
      title: "Space Size",
      dataIndex: "available_space_size",
      key: "available_space_size",
      width: 150,
      render: (v) => <span className="font-medium text-gray-700">{v}</span>,
    },
    {
      title: "Access",
      key: "access",
      width: 180,
      render: (_, r) => (
        <div className="space-y-1">
          <Tag color={r.ground_floor_access ? "green" : "red"}>
            Ground Floor
          </Tag>
          <Tag color={r.direct_road_access ? "green" : "red"}>Road Access</Tag>
          <Tag color={r.parking_loading_area_available ? "green" : "red"}>
            Parking / Loading
          </Tag>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>
          {removeUnderscores(status)}
        </Tag>
      ),
      fixed: "right",
    },
    // Actions
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
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
          <Button
            onClick={() => handleDelete(record?.id)}
            size="small"
            type="primary"
            danger
          >
            Delete
          </Button>
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
        { title: "Warehouse Partners" },
      ]}
    >
      <ResponsiveCard
        title="Warehouse Partners"
        extra={
          <Link to="/warehouse-partners/add">
            <Button size="small" type="primary">
              Add New Warehouse Partner
            </Button>
          </Link>
        }
      >
        <Table
          bordered
          scroll={{ x: "max-content" }}
          size="small"
          columns={columns}
          dataSource={data?.data?.partners}
          loading={isLoading || isDeletePending}
          rowKey={"id"}
        />
        <UrlPagination total={data?.data?.total} />
      </ResponsiveCard>
    </PageLayout>
  );
}
