import { Pie } from "react-chartjs-2";
import {  ChartData,ArcElement, Chart } from "chart.js";

Chart.register(ArcElement);
interface Props {
    data: ChartData<"pie">; 
}
export default function PieChart({data}:Props) {
  return (
    <div>
        <Pie data={data} />
    </div>
  )
}
