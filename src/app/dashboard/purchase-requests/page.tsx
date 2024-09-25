"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { requestColumns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-5">Purchase Request</h1>
        <Button asChild>
          <Link href="/dashboard/purchase-requests/create">Create Request</Link>
        </Button>
      </div>
      <DataTable columns={requestColumns} data={requests} />
    </div>
  );
};

export default Requests;
