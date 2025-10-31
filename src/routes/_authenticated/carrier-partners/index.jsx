import PageLayout from "@/components/layout/PageLayout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Table, Input, Button, Tag, Avatar, Dropdown, Menu, Modal } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const initialPartners = [
  {
    id: 1,
    logo: "/image/delhivery_logo.png",
    companyName: "Delhivery Logistics",
    contactPerson: "Ravi Kumar",
    email: "ravi@delhivery.com",
    phone: "9876543210",
    gst: "27ABCDE1234F1Z5",
    serviceTypes: ["Domestic", "COD"],
    coverage: ["Maharashtra", "Karnataka"],
    active: true,
  },
  {
    id: 2,
    logo: "/image/bluedart_logo.png",
    companyName: "BlueDart Express",
    contactPerson: "Priya Sharma",
    email: "priya@bluedart.com",
    phone: "8765432190",
    gst: "29XYZDE6789F2Z4",
    serviceTypes: ["International", "Reverse"],
    coverage: ["Delhi", "Tamil Nadu"],
    active: false,
  },
];

export const Route = createFileRoute("/_authenticated/carrier-partners/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState("");
  const [viewPartner, setViewPartner] = useState(null);

  const filteredPartners = partners.filter(
    (p) =>
      p.companyName.toLowerCase().includes(search.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this partner?",
      onOk: () => setPartners((prev) => prev.filter((p) => p.id !== id)),
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
    });
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<EyeOutlined />}
        onClick={() => setViewPartner(record)}
      >
        View
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(record.id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (src) => (
        <Avatar
          src={src}
          shape="square"
          size={48}
          className="border border-gray-200 shadow-sm"
        />
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
    },
    {
      title: "Service Types",
      dataIndex: "serviceTypes",
      key: "serviceTypes",
      render: (services) =>
        services.map((s) => (
          <Tag color="blue" key={s}>
            {s}
          </Tag>
        )),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (status) =>
        status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Carrier Partners" }]}
    >
      <ResponsiveCard
        title="Carrier Partners"
        extra={
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by name or contact person"
              prefix={<SearchOutlined />}
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/carrier-partners/add">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Partner
              </Button>
            </Link>
          </div>
        }
      >
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={filteredPartners}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />

        {/* View Partner Modal */}
        <Modal
          open={!!viewPartner}
          title={viewPartner?.companyName}
          onCancel={() => setViewPartner(null)}
          footer={null}
        >
          {viewPartner && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <Avatar src={viewPartner.logo} shape="square" size={64} />
                <div>
                  <p className="font-semibold">{viewPartner.companyName}</p>
                  <p className="text-sm text-gray-500">
                    {viewPartner.contactPerson}
                  </p>
                </div>
              </div>

              <p>
                <span className="font-medium">Email:</span> {viewPartner.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {viewPartner.phone}
              </p>
              <p>
                <span className="font-medium">GST:</span> {viewPartner.gst}
              </p>
              <p>
                <span className="font-medium">Coverage:</span>{" "}
                {viewPartner.coverage.join(", ")}
              </p>
              <div>
                <span className="font-medium">Services:</span>{" "}
                {viewPartner.serviceTypes.map((s) => (
                  <Tag key={s} color="blue">
                    {s}
                  </Tag>
                ))}
              </div>
              <div className="mt-3">
                Status:{" "}
                {viewPartner.active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                )}
              </div>
            </div>
          )}
        </Modal>
      </ResponsiveCard>
    </PageLayout>
  );
}
