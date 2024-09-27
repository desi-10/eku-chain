/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import PostDialog from "./PostDialog";

// Type for Farmer
interface Farmer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  phone_number: string;
  address: string;
  bio: string | null;
  profile_picture: string | null;
  is_verified: boolean;
  user: number;
}

// Type for Produce
interface Produce {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Type for the Main Object
export interface Post {
  id: number;
  farmer: Farmer;
  produce: Produce;
  title: string | null;
  image: string;
  location: string;
  description: string;
  is_negotiable: boolean;
  expected_quantity: number;
  price_per_ton: string;
  expected_harvest_date: string;
  is_sold_out: boolean;
  created_at: string;
  updated_at: string;
}

// Define the columns with the correct type for the data
export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Image",
    accessorKey: "image", // Use the correct accessorKey for your data
    header: () => <Button variant="ghost">Image</Button>,
    cell: ({ row }) => (
      <div className="w-24 rounded overflow-hidden">
        <img
          src={
            row.original.image ||
            "https://archive.org/download/placeholder-image/placeholder-image.jpg"
          }
          className="w-24 h-24 rounded object-cover"
        />
      </div>
    ),
  },
  {
    id: "produce", // This field doesn't exist in the provided data, it should be removed or replaced
    accessorKey: "produce.name", // Update with a valid key if necessary
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produce Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.farmer.first_name}</div>, // Replace with valid key if needed
  },
  // expected_quantity
  {
    id: "Quantity",
    accessorKey: "expected_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expected Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "Price per ton",
    accessorKey: "price_per_ton",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price Per Ton
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "Farmer",
    accessorKey: "farmer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Farmer name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="">
        {row.original.farmer.username + " " + row.original.farmer.last_name}
      </div>
    ),
    enableHiding: false,
  },
  {
    id: "Location",
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Location
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.location}</div>,
  },
  {
    id: "Dialog",
    cell: ({ row }) => <PostDialog data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id.toString())}
            >
              Copy Farmer Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/farmer/${data.id}`}>View Farmer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild className="bg-green-500 hover:bg-green-700">
                <Link href={`/dashboard/orders/create?f=${data.farmer.id}&p=${data.produce.id}&q=${data.expected_quantity}`}>Place Order</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="text-red-500">Delete</div>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
