import React from "react";
import { Pie } from "react-chartjs-2";

import { ChartData, ChartOptions } from "chart.js";

interface PieChartProps {
  dataSet: any[];
}
export default function PieChart({ dataSet }: PieChartProps) {
  const data: ChartData<"pie"> = {
    labels: dataSet.map((item) => item.label),
    datasets: [
      {
        label: "Positive",
        data: dataSet.map((item) => item.percentage),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        // hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    // plugins: {
    //   legend: {
    //     position: "right", // Position the legend on right
    //     labels: {
    //       usePointStyle: true, // Uses pointStyle for legend labels
    //       pointStyle: "circle", // Sets the legend symbol to circular
    //     },
    //   },
    // },
  };
  return (
    <section className="">
      <Pie data={data} />
    </section>
  );
}
