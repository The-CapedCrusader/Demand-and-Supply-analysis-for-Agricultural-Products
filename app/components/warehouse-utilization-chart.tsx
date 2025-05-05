import { ChartContainer } from './ui/chart-new';
import { Pie as PieChart } from 'react-chartjs-2';
import { DashboardCard } from './dashboard-card';
import { useEffect, useId, useState } from 'react';
import 'chart.js/auto';

const utilizationData = {
  labels: ['Used', 'Available'],
  datasets: [
    {
      data: [78, 22],
      backgroundColor: ['rgb(75, 192, 75)', 'rgb(234, 236, 239)'],
      borderWidth: 0,
    },
  ],
};

export function WarehouseUtilizationChart() {
  return (
    <DashboardCard title="Warehouse Utilization">
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-[200px] w-[200px]">
          <ChartContainer>
            <PieChart
              data={utilizationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`,
                    },
                  },
                },
              }}
            />
          </ChartContainer>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Used (78%)</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-gray-200"></div>
          <span className="text-sm">Available (22%)</span>
        </div>
      </div>
    </DashboardCard>
  );
}
