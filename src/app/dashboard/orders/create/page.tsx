"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface Produce {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const OrderCreateForm = () => {
  const methods = useForm({
    defaultValues: {
      order_description: "",
      quantity: 0,
      order_status: "",
      produce: "",
    },
  });

  const { handleSubmit, setValue, reset } = methods;
  const [produces, setProduces] = useState<Produce[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProduces = async () => {
      try {
        const response = await fetch(
          "https://agriguru.pythonanywhere.com/api/produces/"
        );
        const data = await response.json();
        setProduces(data);
      } catch (error) {
        console.error("Error fetching produces:", error);
      }
    };

    fetchProduces();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    const submitOrder = async () => {
      if (status === "authenticated" && session?.user?.farmer_id) {
        try {
          const response = await fetch(
            "https://agriguru.pythonanywhere.com/api/orders/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...data,
                farmer: session.user.farmer_id, // Safely accessing the farmer_id
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to submit order");
          }
          console.log("Order submitted successfully");
          reset(); // Clear inputs if successful
          Swal.fire({
            icon: 'success',
            title: 'Order Submitted',
            text: 'Your order has been submitted successfully.',
          });
        } catch (error) {
          console.error("Error submitting order:", error);
          Swal.fire({
            icon: 'error',
            title: 'Order Submission Failed',
            text: 'Failed to submit your order. Please try again.',
          });
        }
      } else {
        console.error("User is not authenticated or farmer_id is missing");
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'User is not authenticated or farmer_id is missing.',
        });
      }
    };

    submitOrder();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Order Description */}
        <FormItem>
          <Label htmlFor="order_description">Order Description</Label>
          <FormControl>
            <Input
              id="order_description"
              {...methods.register("order_description")}
              placeholder="Enter order description"
            />
          </FormControl>
        </FormItem>

        {/* Quantity */}
        <FormItem>
          <Label htmlFor="quantity">Quantity (Tons)</Label>
          <FormControl>
            <Input
              id="quantity"
              type="number"
              min={0}
              {...methods.register("quantity", { min: 0 })}
              placeholder="Enter quantity"
            />
          </FormControl>
        </FormItem>

        {/* Order Status */}
        <FormItem>
          <Label htmlFor="order_status">Order Status</Label>
          <FormControl>
            <Select onValueChange={(value) => setValue("order_status", value)}>
              <SelectTrigger id="order_status">
                <SelectValue placeholder="Select order status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>

        {/* Produce */}
        <FormItem>
          <Label htmlFor="produce">Produce</Label>
          <FormControl>
            <Select onValueChange={(value) => setValue("produce", value)}>
              <SelectTrigger id="produce">
                <SelectValue placeholder="Select produce" />
              </SelectTrigger>
              <SelectContent>
                {produces.map((produce) => (
                  <SelectItem key={produce.id} value={produce.id.toString()}>
                    {produce.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>

        <Button type="submit">Submit Order</Button>
      </form>
    </FormProvider>
  );
};

export default OrderCreateForm;
