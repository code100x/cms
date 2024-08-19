"use client"

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
  Sector,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
} satisfies ChartConfig

export function CircularProgressBar({ percentage = 91 }) {
  // Ensure percentage is between 0 and 100
  const safePercentage = Math.min(Math.max(percentage, 0), 100)
  const endAngle = (safePercentage / 100) * 450

  const chartData = [
    { percentage: safePercentage, fill: "#fff" },
  ]

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-16 h-16"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={endAngle === 0 ? 450 : endAngle}
          innerRadius={28}
          outerRadius={40}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[#22C55E1A] last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar
            dataKey="percentage"
            background={{ fill: "#22C55E1A" }}
            cornerRadius={20}
            className="first:fill-[#22C55E1A] last:fill-[#22C55E1A]"
            shape={(props: any) => (
              <Sector
                {...props}
                fill="#3D9C5C"
                stroke="#3D9C5C"
                className="bg-[#fff]"
              />
            )}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-sm font-bold"
                      >
                        {`${safePercentage}%`}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}