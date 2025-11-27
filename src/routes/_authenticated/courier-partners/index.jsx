import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import {
  useDeleteCourierPartner,
  useGetAllCourierPartners,
  useToggleCourierPartner,
} from "@/features/courier-partners/courier-partners.query";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Switch } from "antd";
import { Modal } from "antd";
import { Button, Table } from "antd";
import { Tag } from "antd";

export const Route = createFileRoute("/_authenticated/courier-partners/")({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { page, limit } = useSearch({ strict: false });
  const { data, isLoading, isError, error } = useGetAllCourierPartners({
    page,
    limit,
  });

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteCourierPartner({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["courier-partners"]);
      },
    });

  const { mutate: toggleMutate, isPending: isTogglePending } =
    useToggleCourierPartner({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["courier-partners"]);
      },
    });

  const handleToggle = (record) => {
    const data = {
      is_active: record?.is_active == true ? false : true,
    };

    toggleMutate({
      id: record?.id,
      data,
    });
  };

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
  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 80,
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="logo"
            className="size-14 object-contain rounded border shadow-sm"
          />
        ) : (
          <Tag color="default">No Logo</Tag>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-semibold text-blue-600">{text}</div>
          <div className="text-xs text-gray-500">{record.code}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div className="text-sm">
          <div className="font-medium">{record.contact_person}</div>
          <div className="text-gray-500">{record.contact_email}</div>
          <div className="text-gray-500">{record.contact_phone}</div>
        </div>
      ),
    },
    // {
    //   title: "Website",
    //   dataIndex: "website",
    //   key: "website",
    //   render: (url) => (
    //     <a
    //       href={url}
    //       target="_blank"
    //       rel="noreferrer"
    //       className="text-blue-600 underline"
    //     >
    //       {url}
    //     </a>
    //   ),
    // },
    {
      title: "Active",
      render: (_, record) => (
        <Switch
          size="small"
          unCheckedChildren="INACTIVE"
          checkedChildren="ACTIVE"
          checked={record?.is_active}
          onChange={() => handleToggle(record)}
        />
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (value) => <Tag color="purple">{value}</Tag>,
    },
    // Actions view, edit and delete
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" size="small">
            <Link to={`${record.id}`}>View</Link>
          </Button>
          <Button type="link" size="small">
            <Link to={`${record.id}/edit`}>Edit</Link>
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(record?.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Courier Partners" }]}
    >
      <ResponsiveCard
        title="Courier Partners"
        extra={
          <Link to={"create"}>
            <Button size="small" type="primary">
              Add New Courier Partner
            </Button>
          </Link>
        }
      >
        <Table
          size="small"
          loading={isLoading || isDeletePending || isTogglePending}
          bordered
          columns={columns}
          dataSource={data?.data || []}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </ResponsiveCard>
    </PageLayout>
  );
}
