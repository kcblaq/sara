
import { RootState } from '@/app/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import TraficOverview from './graphs/TraficOverview';
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

export function TrafficOverviewGraph() {
  const trafficDetail = useSelector((state: RootState) => state.performance.metrics?.history.traffic)


  const options = {
    responsive: true,
    align: 'end',
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true, // Use point style (circle) for legend labels
        },
      },
    },
  };

  const labels = trafficDetail?.map((item) => moment(item.createdAt).format("Do MMM,YY")) ?? [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Organic',
        data: trafficDetail?.map((item) => item.organic),
        borderColor: 'gray',
        backgroundColor: 'gray',
        borderWidth: 1,
        tension: 0.4,

      },
      {
        label: 'Referal',
        data: trafficDetail?.map((item) => item.referrals),
        borderColor: 'red',
        backgroundColor: 'red',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Search',
        data: trafficDetail?.map((item) => item.search),
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Social',
        data: trafficDetail?.map((item) => item.social),
        borderColor: 'orange',
        backgroundColor: 'orange',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Paid',
        data: trafficDetail?.map((item) => item.paid),
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 1,
        tension: 0.4
      },

    ],
  };


  return <div className=" h-full w-full " >
    <Line options={options} data={data} />
  </div>;
}
