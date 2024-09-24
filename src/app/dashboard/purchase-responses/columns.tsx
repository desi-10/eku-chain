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

// Define the PurchaseRequest type based on the provided data structure.
interface PurchaseRequest {
  id: number;
  quantity_requested: number;
  produce: string;
  proposed_price: string;
  pickup_date: string;
  accepted: boolean;
  rejected: boolean;
  response_date: string;
  price_per_ton: string | null;
  purchase_request: number;
  farmer: number;
}

// Define the columns for the PurchaseRequest table
export const purchaseRequestColumns: ColumnDef<PurchaseRequest>[] = [
  {
    // Checkbox column for selecting rows
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
    // Column for Request ID
    id: "requestId",
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Request ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate w-44">{row.original.id}</div>,
  },
  {
    // Column for Quantity Requested
    id: "quantityRequested",
    accessorKey: "quantity_requested",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity Requested
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.quantity_requested}</div>,
  },
  {
    // Column for Produce
    id: "produce",
    accessorKey: "produce",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produce
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.produce}</div>,
  },
  {
    // Column for Proposed Price
    id: "proposedPrice",
    accessorKey: "proposed_price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Proposed Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.proposed_price}</div>,
  },
  {
    // Column for Pickup Date
    id: "pickupDate",
    accessorKey: "pickup_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pickup Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.pickup_date).toLocaleDateString()}</div>
    ),
  },
  {
    // Column for Accepted
    id: "accepted",
    accessorKey: "accepted",
    header: "Accepted",
    cell: ({ row }) => <div>{row.original.accepted ? "Yes" : "No"}</div>,
  },
  {
    // Column for Rejected
    id: "rejected",
    accessorKey: "rejected",
    header: "Rejected",
    cell: ({ row }) => <div>{row.original.rejected ? "Yes" : "No"}</div>,
  },
  {
    // Actions column with a dropdown menu
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
              Copy Request ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/requests/${data.id}`}>View Request</Link>
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
