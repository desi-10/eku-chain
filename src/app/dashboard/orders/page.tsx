"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { orderColumns } from "./colums";

const Orders = () => {
  const getPosts = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/orders/"
    );
    return data;
  };
  const { data: orders } = useQuery("orders", {
    queryFn: getPosts,
  });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Posts</h1>
      <DataTable columns={orderColumns} data={orders} />
    </div>
  );
};

export default Orders;
