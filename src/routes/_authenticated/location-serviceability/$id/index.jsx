import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import LocationDetails from "@/features/location-serviceability/components/LocationDetails";
import { useGetLocationServiceabilityById } from "@/features/location-serviceability/location-serviceability.query";
import { Link } from "@tanstack/react-router";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "antd";

export const Route = createFileRoute(
  "/_authenticated/location-serviceability/$id/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError, error } =
    useGetLocationServiceabilityById(id);

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Location Serviceability", href: "/location-serviceability" },
        { title: "Details" },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Location Serviceability Details"
        extra={
          <Link to="edit">
            <Button size="small" type="link">
              Edit
            </Button>
          </Link>
        }
      >
        <LocationDetails data={data?.data?.location} />
      </ResponsiveCard>
    </PageLayout>
  );
}
