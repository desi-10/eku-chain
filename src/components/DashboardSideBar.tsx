"use client";

import Link from "next/link";
import React from "react";

const DashboardSideBar = () => {
  const pages = [
    {
      name: "Overview",
      link: "/dashboard",
    },
    {
      name: "Posts",
      link: "/dashboard/posts",
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
    },
    {
      name: "Produces",
      link: "/dashboard/produces",
    },
    {
      name: "Payments",
      link: "/dashboard/payments",
    },
    {
      name: "Purchase-Request",
      link: "/dashboard/purchase-requests",
    },
    {
      name: "Purchase-Response",
      link: "/dashboard/purchase-responses",
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 h-full md:block bg-emerald-500 text-white">
      <div className="flex flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard">
            <h1 className="text-3xl uppercase font-bold">Eku Chain</h1>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid divide-y space-y-3 text-sm font-medium lg:px-4">
            {pages.map((item) => (
              <Link href={item.link} key={item.name}>
                <div className="p-2 rounded-lg ">{item.name}</div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
