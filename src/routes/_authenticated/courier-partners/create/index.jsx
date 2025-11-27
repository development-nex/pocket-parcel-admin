import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import CourierPartnerForm from "@/features/courier-partners/components/CourierPartnerForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/courier-partners/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Courier Partners", href: "/courier-partners" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard title="Create Courier Partner">
        <CourierPartnerForm />
      </ResponsiveCard>
    </PageLayout>
  );
}
