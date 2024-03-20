import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  align: 'end',
  scales: {
    x: {
      grid:{
        display:false
      }
    },
    y :{
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true, // Use point style (circle) for legend labels
      },
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Organic',
      data: [65, 59, 80, 81, 56, 55,24],
      borderColor: 'gray',
      backgroundColor: 'gray',
      tension: 0.4
    },
    {
      label: 'Referal',
      data: [35, 39, 43, 43, 46, 55,70],
      borderColor: 'red',
      backgroundColor: 'red',
      tension: 0.4
    },
    {
      label: 'Direct',
      data: [15, 19, 10, 11, 16, 15, 60],
      borderColor: 'blue',
      backgroundColor: 'blue',
      tension: 0.4
    },
    {
      label: 'Social',
      data: [25, 29, 20, 21, 26, 25, 56],
      borderColor: 'orange',
      backgroundColor: 'orange',
      tension: 0.4
    },
    {
      label: 'Paid',
      data: [95, 99, 90, 91, 96, 95, 97],
      borderColor: 'green',
      backgroundColor: 'green',
      tension: 0.4
    },
    
  ],
};

export function TrafficOverviewGraph() {
  return <div className="w-full h-full ">
    <Line options={options} data={data} className='h-full w-full' />
  </div> ;
}
