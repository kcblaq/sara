
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
  plugins: {
    legend:{
      position: 'top' as const,
      labels: {
        usePointStyle: true,
      }
    }
  },
  responsive: true,
  align:'end',
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      grid: {
        display:false
      }
    },
  },
};
// export const options = {
//     responsive: true,
//     align: 'end',
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           usePointStyle: true, // Use point style (circle) for legend labels
//         },
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart',
//       },
//     },
//   };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'New',
      data: [65, 59, 80, 81, 56, 55,24],
      backgroundColor: '#1570EF',
    },
    {
      label: 'Lost',
      data: [65, 59, 80, 81, 56, 55,24],
      backgroundColor: '#84CAFF',
    }
  ],
};

export function BacklinkGraph() {
  return <Bar options={options} data={data} />;
}
