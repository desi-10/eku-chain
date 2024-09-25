"use client"

import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import Swal from "sweetalert2";


interface Payment {
  amount: number;
  payment_method: string;
  payment_status: string;
  payment_description?: string;
  order: number;
}

interface Order {
  id: number;
  farmer: {
    first_name: string;
    last_name: string;
  };
  produce: {
    name: string;
  };
  order_status: string;
  quantity: number;
}

const PaymentCreateForm = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const methods = useForm<Payment>({
    defaultValues: {
      amount: 0,
      payment_method: "",
      payment_status: "",
      payment_description: "",
      order: 0,
    },
  });

  const { handleSubmit, control, reset } = methods;

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://agriguru.pythonanywhere.com/api/orders/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to fetch orders", "error");
      }
    };

    fetchOrders();
  }, []);

  const onSubmit = async (data: Payment) => {
    try {
      const response = await fetch('https://agriguru.pythonanywhere.com/api/payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire('Success!', 'Payment created successfully.', 'success');
        reset();
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to create payment', 'error');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount */}
        <FormItem>
          <Label htmlFor="amount">Amount</Label>
          <FormControl>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...methods.register("amount", { required: true })}
              placeholder="Enter amount"
            />
          </FormControl>
        </FormItem>

        {/* Payment Method */}
        <FormItem>
          <Label htmlFor="payment_method">Payment Method</Label>
          <FormControl>
            <Controller
              control={control}
              name="payment_method"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="payment_method">
                    {field.value ? field.value : "Select payment method"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="momo">Momo</SelectItem>
                    <SelectItem value="bank">Bank</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
        </FormItem>

        {/* Payment Status */}
        <FormItem>
          <Label htmlFor="payment_status">Payment Status</Label>
          <FormControl>
            <Controller
              control={control}
              name="payment_status"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="payment_status">
                    {field.value ? field.value : "Select payment status"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
        </FormItem>

        {/* Payment Description */}
        <FormItem>
          <Label htmlFor="payment_description">Payment Description</Label>
          <FormControl>
            <Input
              id="payment_description"
              {...methods.register("payment_description")}
              placeholder="Enter payment description (optional)"
            />
          </FormControl>
        </FormItem>

        {/* Order */}
        <FormItem>
          <Label htmlFor="order">Order</Label>
          <FormControl>
            <Controller
              control={control}
              name="order"
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                  <SelectTrigger id="order">
                    {field.value ? `Order #${field.value}` : "Select order"}
                  </SelectTrigger>
                  <SelectContent>
                    {orders.filter(item => item.order_status === "pending").map((order) => (
                      <SelectItem key={order.id} value={order.id.toString()}>
                        {`Order #${order.id} - ${order.produce.name} (${order.farmer.first_name} ${order.farmer.last_name})`}
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

export default PaymentCreateForm;
