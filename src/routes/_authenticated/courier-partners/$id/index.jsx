import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import CourierPartnerDetails from "@/features/courier-partners/components/CourierPartnerDetails";
import { useGetCourierPartnerById } from "@/features/courier-partners/courier-partners.query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/courier-partners/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError, error } = useGetCourierPartnerById(id);

  if (isError) {
    return <ErrorFallback error={error} />;
  }
  console.log(data?.data);
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Courier Partners", href: "/courier-partners" },
        { title: "Courier Partner Details" },
      ]}
    >
      <ResponsiveCard
        loading={isLoading}
        title="Courier Partner Details"
        extra={<Link to="edit">Edit</Link>}
      >
        <CourierPartnerDetails data={data?.data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
