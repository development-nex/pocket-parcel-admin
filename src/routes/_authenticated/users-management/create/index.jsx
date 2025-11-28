import PageLayout from "@/components/layout/PageLayout";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import UserCreateFormItems from "@/features/users-management/components/UserCreateFormItems";
import { useCreateUser } from "@/features/users-management/users-management.query";
import { adminCreateUserSchema } from "@/features/users-management/users-management.schema";
import { handleFormSubmission } from "@/utils/formSubmission.util";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { Button, Form } from "antd";

export const Route = createFileRoute(
  "/_authenticated/users-management/create/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateUser({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["users"]);
      message.success("User created successfully");
      form.resetFields();
      navigate({ to: "/users-management" });
    },
  });

  const handleFinish = (values) => {
    const payload = {
      ...values,
      country_code: values.country_code || "91",
    };
    handleFormSubmission({
      form,
      schema: adminCreateUserSchema,
      onSubmit: (data) => mutate(data),
      values: payload,
    });
  };
  return (
    <PageLayout
      items={[
        { title: "Home", href: "/home" },
        { title: "Users Management", href: "/users-management" },
        { title: "Create" },
      ]}
    >
      <ResponsiveCard title="Create User">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="space-y-3"
          disabled={isPending}
        >
          <UserCreateFormItems />
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => navigate({ to: "/users-management" })}
              htmlType="reset"
            >
              Cancel
            </Button>
            <Button loading={isPending} type="primary" htmlType="submit">
              Create User
            </Button>
          </div>
        </Form>
      </ResponsiveCard>
    </PageLayout>
  );
}
