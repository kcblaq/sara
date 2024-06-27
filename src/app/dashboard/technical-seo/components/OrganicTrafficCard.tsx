import { useSelector } from "react-redux";
import Card from "../../Card";
import { RootState } from "@/app/store";
import { calculatePercentage, millisecondsToSeconds } from "@/lib/DateFormater";
import { Scores } from "@/types/DashboardOverview";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { LineChart } from "./LineChart";




export default function OrganicTrafficCard() {
    const { loading, error, metrics } = useSelector((state: RootState) => state.performance);
    const scores = metrics?.history?.scores ;

let actual: Scores | undefined;
let previosUpdate: Scores | undefined;

const actualOrganicTraffic = metrics?.history?.scores[0]?.organic_traffic ?? 0;
if (scores && scores.length >= 2) {
    actual = scores[0];
    previosUpdate = scores[1];
}

const style = scores?.length === 1 
    ? "text-gray-500"
    : scores && scores.length >= 2 && scores[1]?.organic_traffic !== undefined && scores[0]?.organic_traffic !== undefined 
        ? scores[1].organic_traffic < scores[0].organic_traffic 
            ? "text-green-500"
            : scores[1].organic_traffic === scores[0].organic_traffic 
                ? "text-gray-500"
                : "text-red-500"
        : "text-red-500";



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

    // const backgroundColor = scores?.length === 1
    // ? 'gray'
    // : scores && scores.length >= 2 && scores[0]?.organic_traffic === scores[1]?.organic_traffic
    // ? 'gray'
    // : scores && scores.length >= 2 && scores[0]?.organic_traffic && scores[1]?.organic_traffic
    // ? scores[0].organic_traffic > scores[1].organic_traffic
    //   ? '#ECFDF3'
    //   : 'red'
    // : 'gray';


    // function extractFields(): any[] {
    //     const result: any[] = [];
    //     const newscoreLength = scores ? scores.length - 4 : 0; // Use scores?.length - 4 or default to 0 if scores is null or undefined
    //     const startIndex = Math.max(0, newscoreLength); // Start index for the last four items

    //     for (let i = startIndex; i < (scores?.length ?? 0); i++) { // Use scores?.length ?? 0 to handle null or undefined scores
    //         const item = scores && scores[i];
    //         if (item && item.hasOwnProperty('organic_traffic')) {
    //             result.push(item.organic_traffic);
    //         }
    //     }

    //     return result;
    // }
    const pageData = (scores ?? []).map((item) => item.organic_traffic).filter((value) => value !== undefined) as number[];
    const per = millisecondsToSeconds(TrafficIncreasePercentage(previosUpdate?.average_time_on_site, actual?.average_time_on_site))?.toPrecision(2)
    const checkPercentage = TrafficIncreasePercentage(previosUpdate?.organic_traffic, actual?.organic_traffic)
    // console.log("PAGED", pageData)
    return (

        <Card
            title={"Organic Traffic"}
            amount={ShortenNumber(actualOrganicTraffic)}
            style={pageData.length === 1 ? '' : pageData[0] > pageData[pageData.length -1] ? 'text-green-500' : pageData[0] === pageData[pageData.length -1] ? 'text-gray-500' : 'text-red-500'}
            percent={checkPercentage}
            chart={<LineChart pageData={pageData} />}
            arrowPosition={pageData.length === 1 ? '' : pageData[0] > pageData[pageData.length -1] ? '' : pageData[0] < pageData[1]? 'rotate-180': pageData[0] === pageData[pageData.length -1] ?'':''}
/>
    )
    }