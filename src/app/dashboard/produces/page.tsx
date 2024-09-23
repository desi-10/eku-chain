"use client";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { produceColumns } from "./colums";

const Produces = () => {
  const getProduce = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/produces/"
    );
    return data;
  };
  const { data: produce } = useQuery("produces", {
    queryFn: getProduce,
  });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Produce</h1>
      <DataTable columns={produceColumns} data={produce} />
    </div>
  );
};

export default Produces;
