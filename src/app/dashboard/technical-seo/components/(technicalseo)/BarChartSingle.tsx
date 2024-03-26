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

const labels = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August','September'];
const mockData = [100, 300, 100, 200, 500,900, 100, 200, 800, 300, 900];

export const options = {
  responsive: true,
  scales: {
    x: {
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      grid: {
        display: false 
      },
      title: {
        display: true,
        text:'Crawl date'
      }

    },
    y: {
      grid: {
        display: false 
      },
      title:{
        display: true,
        text:'Number of pages'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: mockData,
      backgroundColor: '#53B1FD',
      borderRadius: 20,
      barPercentage: 1.0,
      width: 100
        // categoryPercentage: 1.0,

    },
  ],
};

export function BarChartSingle() {
  return (
    <div className='h-full w-full'  > 
      <Bar options={options} data={data} width={'200%'} height={'50%'} />
    </div>
  )
}
