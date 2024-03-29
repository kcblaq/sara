
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
interface Props {
  data1: number,
  data2?: number,
  data3?: number,
  data4?: number
}
const ChangeLineChart = ({ data1, data2, data3, data4 }: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const data = {
    labels: ['data1', 'data2', 'data3', 'data4'],
    datasets: [
      {
        data: [data1, data2, data3, data4],
        fill: 'start',
        borderColor: 
        data4 && data4 > data1 ? 'green' :
        data3 && data3 > data1 ? 'green' :
        data2 && data2 > data1 ? 'green' :
        'red'
      ,
        borderWidth: 1,
        pointRadius: 0,
        pointBackgroundColor: data4 && data4 > data1 ? 'green' : 'red',
        backgroundColor: data4 && data4 > data1 ? '#EEFDF5' : "#FEF3F2",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      cubicInterpolationMode: 'monotone',
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-20 h-10">
      <Line data={data} options={options} />
    </div>
  )
};

export default ChangeLineChart;







