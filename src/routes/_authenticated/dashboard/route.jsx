import PageLayout from "@/components/layout/PageLayout";
import AdminDashboard from "@/components/pages/home/AdminDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[{ title: "Home", href: "/home" }, { title: "Dashboard" }]}
    >
      <AdminDashboard />
    </PageLayout>
  );
}
