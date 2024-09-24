import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Payment = {
  id: number;
  amount: string;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  payment_reference: string;
  payment_description: string;
  order: number;
};

type Order = {
  id: number;
  order_number: null;
  order_description: string;
  quantity: number;
  order_status: string;
  order_date: string;
  last_updated: string;
  farmer: number;
  produce: number;
}

const Overview = async () => {
  const response = await fetch(
    "https://agriguru.pythonanywhere.com/api/profiles/"
  );
  const data = await response.json();

  const orderResponse = await fetch(
    "https://agriguru.pythonanywhere.com/api/orders/"
  );
  const orderData = await orderResponse.json();

  const paymentResponse = await fetch(
    "https://agriguru.pythonanywhere.com/api/payment/"
  );
  const paymentData = await paymentResponse.json();
  const totalPurchases = paymentData?.reduce(
    (total: number, payment: { amount: string }) =>
      total + parseFloat(payment.amount),
    0
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Purchases
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHC {totalPurchases}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Farmers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orderData?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your factory.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/payments">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData?.map((payment: Payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-medium">
                        {payment?.payment_reference}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {new Date(payment?.payment_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      GHC {payment?.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Order</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {orderData?.map((order: Order) => (
              <div key={order.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {order?.produce}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order?.last_updated).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto font-medium">{order?.quantity}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Overview;
