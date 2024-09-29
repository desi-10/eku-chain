"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Color map for each produce
const produceColorMap: Record<string, string> = {
  Orange: "#FFA500",
  Pineapple: "#FFD700",
  Ginger: "#A9A9A9",
  Tomato: "#FF6347",
  Mango: "#90EE90",
  // Add more produces and colors as needed
  Unknown: "#D2691E", // Fallback color
}

// Define the interface for the chart data
interface ChartData {
  produce: string
  orders: number
  fill: string
}

// Config for chart styling
const chartConfig = {
  orders: {
    label: "Orders",
  },
} satisfies ChartConfig

export default function TopPurchase() {
  const [chartData, setChartData] = useState<ChartData[]>([])

  // Fetch data from API and prepare chart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://agriguru.pythonanywhere.com/api/orders/")
        const data = await response.json()

        // Process data to count orders per produce
        const produceOrders: Record<string, number> = {}

        data.forEach((order: any) => {
          const produceName = order.produce.name
          if (produceOrders[produceName]) {
            produceOrders[produceName] += 1
          } else {
            produceOrders[produceName] = 1
          }
        })

        // Transform into chart-friendly format
        const transformedData = Object.keys(produceOrders).map((produce) => ({
          produce,
          orders: produceOrders[produce],
          fill: produceColorMap[produce] || produceColorMap["Unknown"], // Use mapped color or fallback
        }))

        setChartData(transformedData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Purchased Produce</CardTitle>
        <CardDescription>Based on order data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="produce"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig.orders?.label ? value : "Orders"
              }
            />
            <XAxis dataKey="orders" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="orders" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total orders for different produce
        </div>
      </CardFooter>
    </Card>
  )
}
