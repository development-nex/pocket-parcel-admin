import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UrlPagination from "@/components/ui/UrlPagination";
import {
  useDeleteNotificationManagement,
  useGetAllNotificationManagement,
  useSendNotificationManagement,
} from "@/features/notification-management/notification-management.query";
import { truncateText } from "@/utils/typography.util";
import { validatePagination } from "@/utils/validatePagination.util";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { message } from "antd";
import { Modal } from "antd";
import { Button, Typography } from "antd";
import { Avatar } from "antd";
import { Tag } from "antd";
import { Table } from "antd";
const { Text } = Typography;
export const Route = createFileRoute(
  "/_authenticated/notification-management/"
)({
  component: RouteComponent,
  validateSearch: (search) => validatePagination(search),
});

function RouteComponent() {
  const { page, limit } = useSearch({ strict: false });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useGetAllNotificationManagement({
    page,
    limit,
  });

  const { mutate: sendMutate, isPending: isSendMutatePending } =
    useSendNotificationManagement({
      onSuccess: async () => {
        message.success("Notification sent successfully");
        await queryClient.invalidateQueries(["notification-management"]);
      },
    });
  const { mutate: deleteMutate, isPending: isDeleteMutatePending } =
    useDeleteNotificationManagement({
      onSuccess: async () => {
        message.success("Notification deleted successfully");
        await queryClient.invalidateQueries(["notification-management"]);
      },
    });

  const handleDelete = (id) => {
    console.log(id);
    Modal.confirm({
      title: "Would you like to delete notification",
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
  const handleSendNotification = (id) => {
    sendMutate(id);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image_url",
      width: 80,
      render: (url) =>
        url ? (
          <Avatar
            src={url}
            shape="square"
            size={48}
            className="border shadow-sm"
          />
        ) : (
          <Avatar shape="square" size={48}>
            N/A
          </Avatar>
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (t) => <Text strong>{t}</Text>,
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (m) => <Text title={m}>{truncateText(m, 30)}</Text>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (p) => <Tag color={p === "HIGH" ? "red" : "green"}>{p}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => <Tag color={s === "SENT" ? "green" : "orange"}>{s}</Tag>,
      fixed: "right",
    },
    {
      title: "Sent At",
      dataIndex: "sent_at",
      width: 180,
      render: (v) =>
        v ? new Date(v).toLocaleString() : <Text type="secondary">—</Text>,
      fixed: "right",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
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

          {record?.status !== "SENT" && (
            <Button
              onClick={() => handleSendNotification(record?.id)}
              size="small"
              type="primary"
            >
              Send
            </Button>
          )}
        </div>
      ),
      fixed: "right",
    },
  ];

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Notification Management" },
      ]}
    >
      <ResponsiveCard
        title="Notification Management"
        extra={
          <Link to="create">
            <Button size="small" type="primary">
              Create
            </Button>
          </Link>
        }
      >
        <Table
          dataSource={data?.data?.notifications || []}
          loading={isLoading || isSendMutatePending || isDeleteMutatePending}
          columns={columns}
          rowKey={"id"}
          bordered
          size="small"
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <UrlPagination total={data?.data?.pagination?.total} />
      </ResponsiveCard>
    </PageLayout>
  );
}
