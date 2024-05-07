import { RootState } from "@/app/store";
import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function HTTPStatusCode() {
    const techSeoData: TechnicalSeoType | null = useSelector((state: RootState) => state.technicalSeo.metrics);
    const statusCodeData = techSeoData?.httpStatusCode[0]; // Add a conditional check using the optional chaining operator (?.)

    // Check if statusCodeData is defined before using it
    if (!statusCodeData) {
        return <div>No data available</div>;
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutoutPercentage: 90, 
        aspectRation: 1
    };

    const data = {
        labels: Object.keys(statusCodeData), 
        datasets: [
            {
                data: Object.values(statusCodeData), 
                backgroundColor: [
                    '#A6F4C5',
                    '#12B76A',
                    '#FDB022',
                    '#F04438',
                    '#FECDCA'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data} options={options}  />
        </div>
    )
}
