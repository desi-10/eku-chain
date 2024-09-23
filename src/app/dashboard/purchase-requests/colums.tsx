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

// Define the FarmerResponse type according to the data structure provided.
interface FarmerResponse {
  id: number; // Unique identifier for the farmer response
  username: string; // Username of the farmer
  first_name: string; // First name of the farmer (optional)
  last_name: string; // Last name of the farmer (optional)
  accepted: boolean; // Whether the response is accepted
  rejected: boolean; // Whether the response is rejected
  price_per_ton: number | null; // Price per ton offered by the farmer (nullable)
  response_date: string; // Date of the response in ISO string format
}

// Define the ProduceDetails type according to the data structure provided.
interface ProduceDetails {
  id: number; // Unique identifier for the produce
  name: string; // Name of the produce
  description: string; // Description of the produce
  image: string; // URL of the produce image
}

// Define the Request type according to the data structure provided.
interface Request {
  id: number; // Unique identifier for the request
  farmers_responded: FarmerResponse[]; // Array of responses from farmers
  produce_details: ProduceDetails; // Details of the produce requested
  quantity_requested: number; // Quantity of produce requested
  proposed_price: string; // Proposed price for the produce
  pickup_date: string; // Date for pickup in ISO string format
  status: string; // Status of the request (e.g., pending)
  created_at: string; // Creation date of the request in ISO string format
  produce: number; // Reference to the produce ID
}

// Define the columns for the Request table
export const requestColumns: ColumnDef<Request>[] = [
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
    cell: ({ row }) => (
      <div className="">{row.original.quantity_requested}</div>
    ),
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
    cell: ({ row }) => <div className="">{row.original.proposed_price}</div>,
  },
  {
    // Column for Produce Name
    id: "produceName",
    accessorKey: "produce_details.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produce Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="">{row.original.produce_details.name}</div>
    ),
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
      <div className="">
        {new Date(row.original.pickup_date).toLocaleDateString()}
      </div>
    ),
  },
  {
    // Column for Status
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.status}</div>,
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
