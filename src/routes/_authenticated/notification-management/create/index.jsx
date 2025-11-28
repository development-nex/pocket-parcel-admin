import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import NotificationForm from "@/features/notification-management/components/NotificationForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/notification-management/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Notification Management", href: "/notification-management" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard title="Create Notification Management">
        <NotificationForm />
      </ResponsiveCard>
    </PageLayout>
  );
}
