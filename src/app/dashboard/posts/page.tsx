"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "./colums";
import { useQuery } from "react-query";
import axios from "axios";

const Posts = () => {
  const getPosts = async () => {
    const { data } = await axios(
      "https://agriguru.pythonanywhere.com/api/posts/"
    );
    return data;
  };
  const { data: posts } = useQuery("posts", {
    queryFn: getPosts,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Posts</h1>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default Posts;
