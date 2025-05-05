'use client';

import type React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartContainerProps {
  children: React.ReactNode;
}

export function ChartContainer({ children }: ChartContainerProps) {
  return <div className="h-full w-full">{children}</div>;
}

export function BarChart(props: any) {
  return <Bar {...props} />;
}

export function LineChart(props: any) {
  return <Line {...props} />;
}

export function PieChart(props: any) {
  return <Pie {...props} />;
}

export function ChartTooltip() {
  return null;
}

export function ChartLegend() {
  return null;
}
