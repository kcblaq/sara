
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export default function DoughnutChart() {
  
  return (
   <Doughnut data={data} options={options} />
  )
}


export const AnotherDoughnutChart = () => {

  const anotherdata = {
    labels: ['Red', 'Blue','Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19,20,82,10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const anotherOptions ={
    plugins: {
      legend: {
        display: false,
      },
    },
    cutoutPercentage: 80,
    responsive: true,
   
  }

  return <Doughnut data={anotherdata} options={anotherOptions} />
}



export const TripleProgressBar = () => {
  const data = {
    labels: ['Progress 1', 'Progress 2', 'Progress 3'],
    datasets: [
      {
        label: 'Progress 1',
        data: [40, 30, 30], // Adjust values to represent progress percentages
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Colors for each segment
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Colors for hover effect
      },
    ],
  };

  const options = {
    cutoutPercentage: 80, // Adjust to control the thickness of the progress bar
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    animation: {
      animateRotate: true,
      animateScale: false,
    },
  };

  return <Doughnut data={data} options={options} />;
};


