"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { paymentColumns } from "./colums";

const Payments = () => {
  const getPayments = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/payment/"
    );
    return data;
  };
  const { data: payments } = useQuery("payments", {
    queryFn: getPayments,
  });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Payments</h1>
      <DataTable columns={paymentColumns} data={payments} />
    </div>
  );
};

export default Payments;
