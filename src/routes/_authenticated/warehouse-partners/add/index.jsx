import PageLayout from "@/components/layout/PageLayout";
import WarehousePartnerForm from "@/components/pages/warehouse-partners/WarehousePartnerForm";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/warehouse-partners/add/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouse Partners", href: "/warehouse-partners" },
        { title: "Add Warehouse Partner" },
      ]}
    >
      <ResponsiveCard title="Add Warehouse Partner">
        <WarehousePartnerForm />
      </ResponsiveCard>
    </PageLayout>
  );
}
