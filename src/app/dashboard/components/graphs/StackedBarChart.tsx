import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";

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
  align: "start",
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
      position: "top" as const,
      align: "end" as const,
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
      arr.push("");
    }
  }

  return arr;
}

export function StackedBarChart() {
  const backlinkData = useSelector(
    (state: RootState) => state.performance.metrics?.history?.backlinks
  );
  const labels =
    backlinkData?.map((item: { createdAt: moment.MomentInput }) =>
      moment(item.createdAt).format("DD MMM YY")
    ) ?? [];
  const newLinks = backlinkData?.map((item: { new: any }) => item.new);
  const lostLinks = backlinkData?.map((item: { lost: any }) => item.lost);

  const data = {
    labels,
    datasets: [
      {
        label: "Lost",
        data: lostLinks,
        backgroundColor: "#F97066",
      },
      {
        label: "New",
        data: newLinks,
        backgroundColor: "#32D583",
      },
    ],
  };

  return (
    <div className="flex flex-col overflow-x-auto w-full h-full">
      <Bar options={options} data={data} />
      <button className="bg-blue-50 text-sm text-blue-700 py-2 px-4 rounded-md self-end  mt-2  hover:outline outline-offset-2 outline-slate-300">
        View Report
      </button>
    </div>
  );
}
