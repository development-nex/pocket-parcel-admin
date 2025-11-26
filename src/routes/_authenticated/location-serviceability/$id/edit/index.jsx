import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import LocationEditForm from "@/features/location-serviceability/components/LocationEditForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/location-serviceability/$id/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Location Serviceability", href: "/location-serviceability" },
        { title: "Edit" },
      ]}
    >
      <ResponsiveCard title="Edit Location Serviceability">
        <LocationEditForm />
      </ResponsiveCard>
    </PageLayout>
  );
}
