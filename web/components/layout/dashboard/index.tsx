import { Header } from "@/components/layout/dashboard/header";
import { Sidebar } from "@/components/layout/dashboard/sidebar";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex bg-secondary max-w-screen">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col w-full sm:max-w-[calc(100%-84px)] sm:ml-[84px] xl:ml-[240px]">
        <Header />
        <section className="h-full flex mt-[72px]">{children}</section>
      </div>
    </main>
  );
};
