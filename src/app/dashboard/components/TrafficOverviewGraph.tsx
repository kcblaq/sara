
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
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
  elements: {
point: {
  radius:0
}
  },
  plugins: {
    legend: {
      position: 'top' as const,
      align:'end' as const,
      labels: {
        usePointStyle: true, // Use point style (circle) for legend labels
      },
    },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Organic',
      data: [65, 59, 35, 40, 56, 55,97],
      borderColor: 'gray',
      backgroundColor: 'gray',
      borderWidth: 1,
      tension: 0.4,
      
    },
    {
      label: 'Referal',
      data: [35, 39, 43, 43, 46, 55,70],
      borderColor: 'red',
      backgroundColor: 'red',
      borderWidth: 1,
      tension: 0.4
    },
    {
      label: 'Direct',
      data: [15, 19, 10, 11, 16, 15, 60],
      borderColor: 'blue',
      backgroundColor: 'blue',
      borderWidth: 1,
      tension: 0.4
    },
    {
      label: 'Social',
      data: [25, 29, 20, 21, 26, 25, 56],
      borderColor: 'orange',
      backgroundColor: 'orange',
      borderWidth: 1,
      tension: 0.4
    },
    {
      label: 'Paid',
      data: [95, 99, 90, 91, 96, 95, 97],
      borderColor: 'green',
      backgroundColor: 'green',
      borderWidth: 1,
      tension: 0.4
    },
    
  ],
};

export function TrafficOverviewGraph() {
  return <div className=" h-full w-full " >
    <Line options={options} data={data}   />
  </div> ;
}
