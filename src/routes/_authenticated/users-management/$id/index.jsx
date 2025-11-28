import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import UserDetailsPage from "@/features/users-management/components/UserDetailsPage";
import {
  useBanUser,
  useGetUserById,
  useUnBanUser,
} from "@/features/users-management/users-management.query";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { message } from "antd";
import { Button } from "antd";

export const Route = createFileRoute("/_authenticated/users-management/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError, error } = useGetUserById(id);
  const { mutate: banUserMutate, isPending: isBanUserPending } = useBanUser({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      message.success("User banned successfully");
    },
  });

  // UnBan user
  const { mutate: unBanUserMutate, isPending: isUnBanUserPending } =
    useUnBanUser({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["users"]);
        message.success("User un banned successfully");
      },
    });

  const handleBanUser = () => {
    banUserMutate(id);
  };

  const handleUnBanUser = () => {
    unBanUserMutate(id);
  };

  const loadingState = isLoading || isBanUserPending || isUnBanUserPending;
  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Users", href: "/users-management" },
        { title: "User Details" },
      ]}
    >
      <ResponsiveCard
        loading={loadingState}
        title="User Details"
        extra={
          <div className="flex gap-2">
            {data?.data?.status !== "BANNED" && (
              <Button
                onClick={handleBanUser}
                size="small"
                type="primary"
                danger
              >
                Ban User
              </Button>
            )}

            {data?.data?.status === "BANNED" && (
              <Button onClick={handleUnBanUser} type="primary" size="small">
                Un User
              </Button>
            )}
          </div>
        }
      >
        <UserDetailsPage data={data?.data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
