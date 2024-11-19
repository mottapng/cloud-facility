import { DashboardLayout } from "@/components/layout/dashboard";

type Props = {
  children: React.ReactNode;
};

const DashboardPageLayout = ({ children }: Props) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardPageLayout;
