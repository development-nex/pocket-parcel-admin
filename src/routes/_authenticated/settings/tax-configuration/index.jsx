import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Table } from "antd";
import { MdOutlineCreate } from "react-icons/md";
// Components

import TaxModal from "@/components/pages/settings/taxConfiguration/modals/TaxModal";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tax Code",
    dataIndex: "tax_code",
    key: "tax_code",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Effective Tax",
    dataIndex: "effective_tax",
    key: "effective_tax",
  },
  {
    render: () => (
      <Button type="default" icon={<MdOutlineCreate />}>
        Add New Pickup Location
      </Button>
    ),
  },
];
export const Route = createFileRoute(
  "/_authenticated/settings/tax-configuration/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState([]);
  return (
    <ResponsiveCard title="Tax Configuration" extra={<TaxModal />}>
      <Table size="small" dataSource={data} columns={columns} />
    </ResponsiveCard>
  );
}
