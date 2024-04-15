import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  align: 'start', 
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the x-axis
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines for the y-axis
      },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
    },
  },
  elements: {
    bar: {
      borderRadius: 10, // Set border radius for bars
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
      },
    },
  },
  barThickness: 30, // Set the width of each bar
};


export function completeArray(arr: string[]) {
  const maxLength = 10;
  const currentLength = arr.length;

  if (currentLength < maxLength) {
    const emptyElementsToAdd = maxLength - currentLength;
    for (let i = 0; i < emptyElementsToAdd; i++) {
      arr.push('');
    }
  }

  return arr;
}

const detail = ['January', 'February']
const labels = completeArray(detail);





export const data = {
  labels,
  datasets: [
    {
      label: 'Lost',
      data: [25, 43],
      backgroundColor: '#F97066',
    },
    {
      label: 'New',
      data: [2, 19],
      backgroundColor: '#32D583',
    }
  ],
};

export function StackedBarChart() {
  return (
    <div className=' overflow-x-auto w-full h-full'>

      <Bar options={options} data={data}  />
    </div>

  )
}
