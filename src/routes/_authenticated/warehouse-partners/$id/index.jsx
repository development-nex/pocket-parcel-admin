import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import ErrorFallback from "@/components/ui/ErrorFallback";
import WarehousePartnerDetails from "@/features/warehouse-partners/components/WarehousePartnerDetails";
import WarehousePartnerStatusModal from "@/features/warehouse-partners/components/WarehousePartnerStatusModal";
import { useGetWarehousePartnerById } from "@/features/warehouse-partners/warehouse-partners.query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { TbCancel } from "react-icons/tb";

export const Route = createFileRoute("/_authenticated/warehouse-partners/$id/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const [statusModal, setStatusModal] = useState({
    open: false,
    id: null,
    status: null,
  });
  const { data, isLoading, isError, error } = useGetWarehousePartnerById(id);

  const handleModifyStatus = (status) => {
    setStatusModal({ open: true, id, status });
  };

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Warehouse Partners", href: "/warehouse-partners" },
        { title: "Warehouse Partner Details" },
      ]}
    >
      <WarehousePartnerStatusModal
        handleClose={() =>
          setStatusModal({
            open: false,
            id: null,
            status: null,
          })
        }
        data={statusModal}
      />
      <ResponsiveCard
        loading={isLoading}
        title="Warehouse Partner Details"
        extra={
          data?.data?.status === "PENDING_REVIEW" && (
            <div className="flex gap-2">
              <Button
                size="small"
                type="primary"
                icon={<AiOutlineCheck />}
                onClick={() => handleModifyStatus("APPROVED")}
              >
                Approve
              </Button>
              <Button
                icon={<TbCancel />}
                size="small"
                type="primary"
                danger
                onClick={() => handleModifyStatus("REJECTED")}
              >
                Reject
              </Button>
            </div>
          )
        }
      >
        <WarehousePartnerDetails data={data?.data} />
      </ResponsiveCard>
    </PageLayout>
  );
}
