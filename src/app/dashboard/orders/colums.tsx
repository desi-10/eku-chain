/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import PaymentDialog from "../payments/create/PaymentDialog";

// Type for Order
interface Order {
  id: number;
  order_number: string | null;
  order_description: string;
  quantity: number;
  order_status: string;
  order_date: string;
  last_updated: string;
  farmer: number; // Assuming this is a reference to a Farmer ID
  produce: number; // Assuming this is a reference to a Produce ID
}

// Define the columns for the Order table
export const orderColumns: ColumnDef<Order>[] = [
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
    id: "image",
    accessorKey: "produce.image", // Use the correct accessorKey for your data
    header: () => <Button variant="ghost">Image</Button>,
    cell: ({ row }) => (
      <div className="w-44 rounded overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={row.original.produce?.image || "http://via.placeholder.com/150"}
          alt="produce image"
        />
      </div>
    ),
  },
  {
    id: "orderNo",
    accessorKey: "order_number", // Use the correct accessorKey for your data
    header: () => <Button variant="ghost">Order No</Button>,
    cell: ({ row }) => (
      <div className="truncate w-44">{row.original.order_number || "N/A"}</div>
    ),
  },
  {
    id: "orderProduce",
    accessorKey: "produce.name", // Use the correct accessorKey for your data
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produce
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.original.produce.name}</div>
    ),
    enableHiding: false,
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.quantity}</div>,
  },
  {
    id: "orderStatus",
    accessorKey: "order_status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.order_status}</div>,
  },
  {
    id: "orderDate",
    accessorKey: "order_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="">
        {new Date(row.original.order_date).toLocaleString()}
      </div>
    ),
  },
  {
    id: "pay",
    cell: ({row}) => (
      <Button asChild className="bg-emerald-500 hover:bg-green-600">
        <Link href={`/dashboard/payments/create?o=${row.original.id}`}>Make Payment</Link>
      </Button>
    ),
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
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/orders/${data.id}`}>View Order</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="text-red-500">Delete</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
