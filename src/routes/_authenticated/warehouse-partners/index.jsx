import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_authenticated/warehouse-partners/")({
  component: RouteComponent,
});
const columns = [
  {
    title: "S. No.",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "warehouse_type",
    key: "warehouse_type",
  },
  {
    title: "Pincode",
    dataIndex: "postal_code",
    key: "postal_code",
  },
  {
    title: "GST",
    dataIndex: "gst_number",
    key: "gst_number",
  },
  {
    title: "Storage Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];
function RouteComponent() {
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
        <Table size="small" columns={columns} dataSource={[]} />
      </ResponsiveCard>
    </PageLayout>
  );
}
