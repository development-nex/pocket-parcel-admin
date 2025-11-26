import PageLayout from "@/components/layout/PageLayout";
import LocationForm from "@/components/pages/location-serviceability/LocationForm";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/location-serviceability/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Location Serviceability", href: "/location-serviceability" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard title="Create Location Serviceability">
        <LocationForm />
      </ResponsiveCard>
    </PageLayout>
  );
}
