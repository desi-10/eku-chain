"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

export const description = "A bar chart displaying inventory data";

interface Inventory {
  id: number;
  produce: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface Produce {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Define a color map for each produce type
const produceColorMap: Record<string, string> = {
  Orange: "#FFA500",
  Pineapple: "#FFD700",
  Ginger: "#A9A9A9",
  Tomato: "#FF6347",
  Mango: "#90EE90",
  // Add more produces and colors as needed
  Unknown: "#D2691E", // Fallback color
};

const InventoryChart = ({ refetchTrigger }: { refetchTrigger?: boolean }) => {
  const [chartData, setChartData] = useState<any[]>([]); // Holds the mapped chart data
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null); // Chart config

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const inventoryResponse = await fetch(
          "https://agriguru.pythonanywhere.com/api/inventory/"
        );
        const inventoryData: Inventory[] = await inventoryResponse.json();

        const produceResponse = await fetch(
          "https://agriguru.pythonanywhere.com/api/produces/"
        );
        const produceData: Produce[] = await produceResponse.json();

        // Map inventory data with corresponding produce names and colors
        const mappedData = inventoryData.map((inventory) => {
          const produce = produceData.find(
            (prod) => prod.id === inventory.produce
          );
          const produceName = produce?.name || "Unknown";

          return {
            produce_name: produceName,
            quantity: inventory.quantity,
            fill: produceColorMap[produceName] || produceColorMap["Unknown"], // Assign color based on produce type
          };
        });

        setChartData(mappedData);

        // Create dynamic chart config based on the produces
        const dynamicConfig = produceData.reduce((acc, produce) => {
          acc[produce.name] = {
            label: produce.name,
            color: produceColorMap[produce.name] || produceColorMap["Unknown"], // Use the corresponding color
          };
          return acc;
        }, {} as ChartConfig);

        setChartConfig(dynamicConfig);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, [refetchTrigger]);

  if (!chartConfig) {
    return <div>Loading chart...</div>;
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Inventory Level</CardTitle>
        <CardDescription>Total inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            height={250} // Adjust this value to reduce chart height
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="produce_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="quantity"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InventoryChart;
