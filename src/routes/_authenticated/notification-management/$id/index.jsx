import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import NotificationDetailsPage from "@/features/notification-management/components/NotificationDetailsPage";
import { useGetNotificationManagementById } from "@/features/notification-management/notification-management.query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "antd";

export const Route = createFileRoute(
  "/_authenticated/notification-management/$id/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });

  const { data, isLoading } = useGetNotificationManagementById(id);
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Notification Management", href: "/notification-management" },
        {
          title: "Notification Details",
        },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Notification Details"
        extra={
          <Link to="edit">
            <Button size="small" type="link">
              Edit
            </Button>
          </Link>
        }
      >
        <NotificationDetailsPage data={data?.data} loading={isLoading} />
      </ResponsiveCard>
    </PageLayout>
  );
}
