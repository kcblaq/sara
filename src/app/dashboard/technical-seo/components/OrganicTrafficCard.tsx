import { useSelector } from "react-redux";
import Card from "../../Card";
import { RootState } from "@/app/store";
import { calculatePercentage, millisecondsToSeconds } from "@/lib/DateFormater";
import ChangeLineChart from "@/app/component/charts/Bars";



export default function OrganicTrafficCard() {
    const { loading, error, metrics } = useSelector((state: RootState) => state.performance);
    const scores = metrics && metrics?.history.scores;
    const previosUpdate = metrics?.history.scores[scores && scores.length > 0 ? scores.length - 2 : 0];
    const actual = metrics?.history.scores[scores && scores.length > 0 ? scores?.length - 1 : 0];
    const actualOrganicTraffic = actual?.organic_traffic ?? 0;

    const trafficIncrease = previosUpdate?.organic_traffic !== undefined && previosUpdate?.organic_traffic < actualOrganicTraffic ? "true"
        : previosUpdate?.organic_traffic !== undefined && previosUpdate?.organic_traffic == actualOrganicTraffic ? "nil" : "false";

    // Check if both previosUpdate and actual are defined
    const TrafficIncreasePercentage = (previousTraffic: number | undefined, currentTraffic: number | undefined) => {
        if (previosUpdate && actual) {
            if (previousTraffic !== undefined && currentTraffic !== undefined) {
                const trafficIncrease = currentTraffic - previousTraffic;
                const trafficIncreasePercentage = calculatePercentage(trafficIncrease, previousTraffic);
                return trafficIncreasePercentage
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

    function extractFields(): any[] {
        const result: any[] = [];
        const newscoreLength = scores ? scores.length - 4 : 0; // Use scores?.length - 4 or default to 0 if scores is null or undefined
        const startIndex = Math.max(0, newscoreLength); // Start index for the last four items

        for (let i = startIndex; i < (scores?.length ?? 0); i++) { // Use scores?.length ?? 0 to handle null or undefined scores
            const item = scores && scores[i];
            if (item && item.hasOwnProperty('organic_traffic')) {
                result.push(item.organic_traffic);
            }
        }

        return result;
    }

    const per = millisecondsToSeconds(TrafficIncreasePercentage(previosUpdate?.average_time_on_site, actual?.average_time_on_site))?.toPrecision(2)
    const percent = Number(per)
    const checkPercentage = TrafficIncreasePercentage(previosUpdate?.organic_traffic, actual?.organic_traffic)

    return (

        <Card
            title={"Organic Traffic"}
            amount={actualOrganicTraffic}
            style={checkPercentage > 0 ? "text-green-500" : "text-red-500"}
            percent={checkPercentage}
            chart={<ChangeLineChart data1={extractFields()[0]} data2={extractFields()[1]} data3={extractFields()[2]} data4={extractFields()[3]} />}
            arrowPosition={checkPercentage == 0 ? "rotate-90" : checkPercentage < 0 ? "rotate-180" : ""}
        />

    )
}
