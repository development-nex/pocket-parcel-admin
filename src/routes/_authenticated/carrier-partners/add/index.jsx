import PageLayout from "@/components/layout/PageLayout";
import CarrierPartnerForm from "@/components/pages/carrier-partners/CarrierPartnerForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/carrier-partners/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Carrier Partners", href: "/carrier-partners" },
        { title: "Add New Carrier Partner" },
      ]}
    >
      <CarrierPartnerForm />
    </PageLayout>
  );
}
