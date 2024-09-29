// "use client"

// import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A mixed bar chart"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export default function TopPurchase() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Bar Chart - Mixed</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             layout="vertical"
//             margin={{
//               left: 0,
//             }}
//           >
//             <YAxis
//               dataKey="browser"
//               type="category"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) =>
//                 chartConfig[value as keyof typeof chartConfig]?.label
//               }
//             />
//             <XAxis dataKey="visitors" type="number" hide />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="visitors" layout="vertical" radius={5} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }



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
        const transformedData = Object.keys(produceOrders).map((produce, index) => ({
          produce,
          orders: produceOrders[produce],
          fill: `hsl(var(--chart-${index + 1}))`, // Cycle colors for different produce
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
