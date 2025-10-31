import { createFileRoute } from "@tanstack/react-router";

import PageLayout from "@/components/layout/PageLayout";

import AdminHomePage from "@/components/pages/home/AdminHomePage";

export const Route = createFileRoute("/_authenticated/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <AdminHomePage />
    </PageLayout>
  );
}
