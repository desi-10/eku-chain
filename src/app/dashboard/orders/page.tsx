"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { orderColumns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Orders = () => {
  const getOrders = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/orders/"
    );
    return data;
  };
  const { data: orders } = useQuery("orders", {
    queryFn: getOrders,
  });
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-5">Orders</h1>
        <Button asChild>
          <Link href="/dashboard/orders/create">Create Order</Link>
        </Button>
      </div>
      <DataTable columns={orderColumns} data={orders} />
    </div>
  );
};

export default Orders;
