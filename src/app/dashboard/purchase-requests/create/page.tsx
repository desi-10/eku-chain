"use client"

import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import Swal from "sweetalert2";

interface PurchaseRequest {
  quantity_requested: number;
  proposed_price?: string;
  pickup_date: string;
  status?: string;
  produce: number;
}

interface Produce {
  id: number;
  name: string;
}

const PurchaseRequestForm = () => {
  const [produces, setProduces] = useState<Produce[]>([]);
  const methods = useForm<PurchaseRequest>({
    defaultValues: {
      quantity_requested: 0,
      proposed_price: "",
      pickup_date: "",
      status: "pending",
      produce: 0,
    },
  });

  const { handleSubmit, control, reset } = methods;

  // Fetch produces from the API
  useEffect(() => {
    const fetchProduces = async () => {
      try {
        const response = await fetch("https://agriguru.pythonanywhere.com/api/produces/");
        if (!response.ok) {
          throw new Error("Failed to fetch produces");
        }
        const data = await response.json();
        setProduces(data);
      } catch (error) {
        console.error("Error fetching produces:", error);
        Swal.fire("Error", "Failed to fetch produces", "error");
      }
    };

    fetchProduces();
  }, []);

  const onSubmit = async (data: PurchaseRequest) => {
    try {
      const response = await fetch('https://agriguru.pythonanywhere.com/api/purchase-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire('Success!', 'Purchase request created successfully.', 'success');
        reset();
      } else {
        throw new Error('Failed to create purchase request');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to create purchase request', 'error');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Quantity Requested */}
        <FormItem>
          <Label htmlFor="quantity_requested">Quantity Requested (tons)</Label>
          <FormControl>
            <Input
              id="quantity_requested"
              type="number"
              min={0}
              {...methods.register("quantity_requested", { required: true })}
              placeholder="Enter quantity requested"
            />
          </FormControl>
        </FormItem>

        {/* Proposed Price */}
        <FormItem>
          <Label htmlFor="proposed_price">Proposed Price (per ton)</Label>
          <FormControl>
            <Input
              id="proposed_price"
              type="number"
              step="0.01"
              {...methods.register("proposed_price")}
              placeholder="Enter proposed price (optional)"
            />
          </FormControl>
        </FormItem>

        {/* Pickup Date */}
        <FormItem>
          <Label htmlFor="pickup_date">Pickup Date</Label>
          <FormControl>
            <Input
              id="pickup_date"
              type="date"
              {...methods.register("pickup_date", { required: true })}
              placeholder="Select pickup date"
            />
          </FormControl>
        </FormItem>

        {/* Status */}
        <FormItem>
          <Label htmlFor="status">Status</Label>
          <FormControl>
            <Controller
              control={control}
              name="status"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="status">
                    {field.value ? field.value : "Select status"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
        </FormItem>

        {/* Produce */}
        <FormItem>
          <Label htmlFor="produce">Produce</Label>
          <FormControl>
            <Controller
              control={control}
              name="produce"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                  <SelectTrigger id="produce">
                    {field.value ? `Produce #${field.value}` : "Select produce"}
                  </SelectTrigger>
                  <SelectContent>
                    {produces.map((produce) => (
                      <SelectItem key={produce.id} value={produce.id.toString()}>
                        {produce.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default PurchaseRequestForm;
