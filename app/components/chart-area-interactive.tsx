import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '~/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

export const description = 'An interactive area chart for crop price trends';

const chartData = [
  { date: '2024-04-01', rice: 2.22, wheat: 1.5 },
  { date: '2024-04-02', rice: 1.97, wheat: 1.8 },
  { date: '2024-04-03', rice: 2.67, wheat: 1.9 },
  { date: '2024-04-04', rice: 2.42, wheat: 2.1 },
  { date: '2024-04-05', rice: 2.73, wheat: 2.2 },
  { date: '2024-04-06', rice: 3.01, wheat: 2.4 },
  { date: '2024-04-07', rice: 2.45, wheat: 1.8 },
  { date: '2024-04-08', rice: 2.69, wheat: 2.0 },
  { date: '2024-04-09', rice: 2.59, wheat: 2.1 },
  { date: '2024-04-10', rice: 2.61, wheat: 1.9 },
  { date: '2024-04-11', rice: 2.77, wheat: 2.2 },
  { date: '2024-04-12', rice: 2.92, wheat: 2.1 },
  { date: '2024-04-13', rice: 2.82, wheat: 2.3 },
  { date: '2024-04-14', rice: 2.37, wheat: 2.2 },
  { date: '2024-04-15', rice: 2.2, wheat: 1.7 },
  { date: '2024-04-16', rice: 2.38, wheat: 1.9 },
  { date: '2024-04-17', rice: 2.46, wheat: 2.1 },
  { date: '2024-04-18', rice: 2.64, wheat: 2.3 },
  { date: '2024-04-19', rice: 2.43, wheat: 1.8 },
  { date: '2024-04-20', rice: 2.29, wheat: 1.7 },
  { date: '2024-04-21', rice: 2.37, wheat: 2.0 },
  { date: '2024-04-22', rice: 2.24, wheat: 1.7 },
  { date: '2024-04-23', rice: 2.38, wheat: 2.1 },
  { date: '2024-04-24', rice: 2.57, wheat: 2.3 },
  { date: '2024-04-25', rice: 2.75, wheat: 2.5 },
  { date: '2024-04-26', rice: 2.65, wheat: 2.3 },
  { date: '2024-04-27', rice: 2.83, wheat: 2.4 },
  { date: '2024-04-28', rice: 2.72, wheat: 2.1 },
  { date: '2024-04-29', rice: 2.65, wheat: 2.2 },
  { date: '2024-04-30', rice: 2.84, wheat: 2.5 },
  { date: '2024-05-01', rice: 2.65, wheat: 2.2 },
  { date: '2024-05-02', rice: 2.73, wheat: 2.3 },
  { date: '2024-05-03', rice: 2.67, wheat: 2.1 },
  { date: '2024-05-04', rice: 2.85, wheat: 2.4 },
  { date: '2024-05-05', rice: 2.91, wheat: 2.6 },
  { date: '2024-05-06', rice: 2.98, wheat: 2.7 },
  { date: '2024-05-07', rice: 2.88, wheat: 2.5 },
  { date: '2024-05-08', rice: 2.69, wheat: 2.3 },
  { date: '2024-05-09', rice: 2.77, wheat: 2.2 },
  { date: '2024-05-10', rice: 2.93, wheat: 2.5 },
  { date: '2024-05-11', rice: 2.85, wheat: 2.4 },
  { date: '2024-05-12', rice: 2.77, wheat: 2.2 },
  { date: '2024-05-13', rice: 2.67, wheat: 2.0 },
  { date: '2024-05-14', rice: 2.78, wheat: 2.3 },
  { date: '2024-05-15', rice: 2.73, wheat: 2.2 },
  { date: '2024-05-16', rice: 2.88, wheat: 2.5 },
  { date: '2024-05-17', rice: 2.99, wheat: 2.8 },
  { date: '2024-05-18', rice: 3.15, wheat: 2.9 },
  { date: '2024-05-19', rice: 3.05, wheat: 2.7 },
  { date: '2024-05-20', rice: 2.97, wheat: 2.6 },
  { date: '2024-05-21', rice: 2.82, wheat: 2.4 },
  { date: '2024-05-22', rice: 2.71, wheat: 2.2 },
  { date: '2024-05-23', rice: 2.82, wheat: 2.4 },
  { date: '2024-05-24', rice: 2.94, wheat: 2.6 },
  { date: '2024-05-25', rice: 3.01, wheat: 2.7 },
  { date: '2024-05-26', rice: 2.93, wheat: 2.5 },
  { date: '2024-05-27', rice: 3.1, wheat: 2.8 },
  { date: '2024-05-28', rice: 3.03, wheat: 2.6 },
  { date: '2024-05-29', rice: 2.78, wheat: 2.3 },
  { date: '2024-05-30', rice: 2.9, wheat: 2.5 },
  { date: '2024-05-31', rice: 2.88, wheat: 2.4 },
  { date: '2024-06-01', rice: 2.78, wheat: 2.3 },
  { date: '2024-06-02', rice: 2.7, wheat: 2.2 },
  { date: '2024-06-03', rice: 2.63, wheat: 2.1 },
  { date: '2024-06-04', rice: 2.59, wheat: 2.0 },
  { date: '2024-06-05', rice: 2.68, wheat: 2.1 },
  { date: '2024-06-06', rice: 2.74, wheat: 2.2 },
  { date: '2024-06-07', rice: 2.83, wheat: 2.4 },
  { date: '2024-06-08', rice: 2.85, wheat: 2.5 },
  { date: '2024-06-09', rice: 2.78, wheat: 2.4 },
  { date: '2024-06-10', rice: 2.75, wheat: 2.2 },
  { date: '2024-06-11', rice: 2.72, wheat: 2.1 },
  { date: '2024-06-12', rice: 2.82, wheat: 2.3 },
  { date: '2024-06-13', rice: 2.81, wheat: 2.2 },
  { date: '2024-06-14', rice: 2.76, wheat: 2.1 },
  { date: '2024-06-15', rice: 2.77, wheat: 2.2 },
  { date: '2024-06-16', rice: 2.71, wheat: 2.0 },
  { date: '2024-06-17', rice: 2.75, wheat: 2.1 },
  { date: '2024-06-18', rice: 2.77, wheat: 2.2 },
  { date: '2024-06-19', rice: 2.71, wheat: 2.0 },
  { date: '2024-06-20', rice: 2.68, wheat: 1.9 },
  { date: '2024-06-21', rice: 2.69, wheat: 2.0 },
  { date: '2024-06-22', rice: 2.67, wheat: 1.9 },
  { date: '2024-06-23', rice: 2.7, wheat: 2.0 },
  { date: '2024-06-24', rice: 2.72, wheat: 2.1 },
  { date: '2024-06-25', rice: 2.71, wheat: 2.0 },
  { date: '2024-06-26', rice: 2.74, wheat: 2.1 },
  { date: '2024-06-27', rice: 2.78, wheat: 2.3 },
  { date: '2024-06-28', rice: 2.79, wheat: 2.4 },
  { date: '2024-06-29', rice: 2.73, wheat: 2.2 },
  { date: '2024-06-30', rice: 2.75, wheat: 2.3 },
];

const chartConfig = {
  crops: {
    label: 'Crop Prices',
  },
  rice: {
    label: 'Rice ($/kg)',
    color: 'var(--primary)',
  },
  wheat: {
    label: 'Wheat ($/kg)',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Crop Price Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Market prices for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="rice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary) / 0.5)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary) / 0.5)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="wheat" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--chart-2) / 0.5)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--chart-2) / 0.5)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickMargin={10}
              tickFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid vertical={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-card/60 rounded-lg border-none px-4 py-3 backdrop-blur-sm"
                  formatter={(value, name) => {
                    return [`$${Number(value).toFixed(2)}`, name];
                  }}
                  labelFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="rice"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#rice)"
            />
            <Area
              type="monotone"
              dataKey="wheat"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#wheat)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
