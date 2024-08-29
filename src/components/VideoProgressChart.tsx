'use client';

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
const chartData = [{ videoProgress: 200, fill: 'green' }];

const chartConfig = {} satisfies ChartConfig;

export function VideoProgressChart({
  videoProgressPercent,
}: {
  videoProgressPercent: string;
}) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square size-12 max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={-360 * (+videoProgressPercent / 100)}
        innerRadius={20}
        outerRadius={30}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[22, 18]}
        />
        <RadialBar
          dataKey="videoProgress"
          background
          cornerRadius={10}
          radius={20}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                      className="fill-foreground text-xs font-bold"
                    >
                      {videoProgressPercent}%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
