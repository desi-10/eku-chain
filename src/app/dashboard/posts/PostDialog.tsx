/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Assuming data is of type Post
const PostDialog = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600">View Post</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {data.title ? data.title : "Post Details"}
          </DialogTitle>
        </DialogHeader>
        {/* Display the post image */}
        <div className="my-4">
          <img
            src={data.image}
            alt={data.produce.name}
            className="w-full h-64 rounded-lg object-cover"
          />
        </div>
        <DialogDescription className="text-sm space-y-3">
          {/* Farmer Information */}
          <div>
            <strong>Farmer:</strong> {data.farmer.first_name} {data.farmer.last_name}
          </div>
          {/* Produce Information */}
          <div>
            <strong>Produce:</strong> {data.produce.name}
          </div>
          {/* Description */}
          <div>
            <strong>Description:</strong> {data.description}
          </div>
          {/* Location */}
          <div>
            <strong>Location:</strong> {data.location}
          </div>
          {/* Price per Ton */}
          <div>
            <strong>Price per Ton:</strong> GHC {data.price_per_ton}
          </div>
          {/* Expected Harvest Date */}
          <div>
            <strong>Expected Harvest Date:</strong> {new Date(data.expected_harvest_date).toLocaleDateString()}
          </div>
          {/* Negotiable */}
          <div>
            <strong>Negotiable:</strong> {data.is_negotiable ? "Yes" : "No"}
          </div>
          {/* Sold Out */}
          <div>
            <strong>Sold Out:</strong> {data.is_sold_out ? "Yes" : "No"}
          </div>
          {/* Farmer Contact */}
          <div>
            <strong>Contact Farmer:</strong> {data.farmer.phone_number}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
