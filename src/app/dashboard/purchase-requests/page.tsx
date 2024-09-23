"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { requestColumns } from "./colums";

const Requests = () => {
  const getRequests = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/purchase-request/"
    );
    return data;
  };
  const { data: requests } = useQuery("requests", {
    queryFn: getRequests,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Purchase Request</h1>
      <DataTable columns={requestColumns} data={requests} />
    </div>
  );
};

export default Requests;
