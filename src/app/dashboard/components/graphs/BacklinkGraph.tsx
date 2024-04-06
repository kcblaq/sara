
import { RootState } from '@/app/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

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


export function BacklinkGraph() {

  const backlinkData = useSelector((state: RootState) => state.performance.metrics?.history.backlinks);
  const formattedDate = moment("2024-04-05T13:11:00.000Z").format("DD, MMMM, 'YY");
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = backlinkData?.map((item)=> moment(item.createdAt).format("DD, MMMM, YY"));

const data = {
  labels,
  datasets: [
    {
      label: 'New',
      data: backlinkData?.map((item)=> item.new),
      backgroundColor: '#1570EF',
    },
    {
      label: 'Count',
      
      data: backlinkData?.map((item)=> item.counts),
      backgroundColor: '#84CAFF',
    }
  ],
};
  console.log("BACK",backlinkData)
  return <Bar options={options} data={data} />;
}
