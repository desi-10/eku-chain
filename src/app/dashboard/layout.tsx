import DashboardHeader from "@/components/DashboardHeader";
import DashboardSideBar from "@/components/DashboardSideBar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      {/* <aside>Side bar</aside> */}
      <div className="w-[300px]">
        <DashboardSideBar />
      </div>

      <section className="w-full overflow-y-auto">
        <DashboardHeader />
        <div className="p-10"> {children}</div>
      </section>
    </div>
  );
};

export default DashboardLayout;
