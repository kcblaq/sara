import { calculatePercentage, millisecondsToSeconds } from "@/lib/DateFormater";
import Card from "../../Card";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ChangeLineChart from "@/app/component/charts/Bars";
import { ConvertToMilliuseconds } from "@/app/utils/ConvertToMilliseconds";

export default function AverageTimeOnsite() {
    const { loading, error, metrics } = useSelector((state: RootState) => state.performance);
    
    const scores = metrics && metrics?.history?.scores;
    const previosUpdate = metrics?.history?.scores[scores && scores.length > 0 ? scores.length - 2 : 0];
    const lastThreepreviosUpdate = metrics?.history?.scores[scores && scores.length > 0 ? scores.length - 3 : 0];
    const actual = metrics?.history?.scores[0];
    const averageTimeOnsite = actual?.average_time_on_site ?? 0;

    const TrafficIncreasePercentage = (previousTraffic: number | undefined, currentTraffic: number | undefined):number => {
        if (previosUpdate && actual) {
            if (previousTraffic !== undefined && currentTraffic !== undefined) {
                const trafficIncrease = currentTraffic - previousTraffic;
                const AverageTimeonsitePercentage = calculatePercentage(trafficIncrease, previousTraffic);
                return AverageTimeonsitePercentage
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    const pageData = (scores ?? []).map((item) => item.average_time_on_site).filter((value) => value !== undefined) as number[];

    // console.log("PAGED", pageData)
    function extractFields(): any[] {
        const result: any[] = [];
        const newscoreLength = scores ? scores.length - 4 : 0; // Use scores?.length - 4 or default to 0 if scores is null or undefined
        const startIndex = Math.max(0, newscoreLength); // Start index for the last four items

        for (let i = startIndex; i < (scores?.length ?? 0); i++) { // Use scores?.length ?? 0 to handle null or undefined scores
            const item = scores && scores[i];
            if (item && item.hasOwnProperty('average_time_on_site')) {
                result.push(item.average_time_on_site);
            }
        }

        return result;
    }
    const arrowPosition = pageData && pageData.length > 0 ? (pageData[0] > pageData[pageData.length - 1] ? 'text-green-500' 
  : pageData[0] === pageData[pageData.length - 1] ? '' : 'text-red-500 rotate-180') : '';

    let per:any = (pageData[0] - pageData[pageData.length -1]).toFixed(1);
    
    
    // const per = millisecondsToSeconds(TrafficIncreasePercentage(lastThreepreviosUpdate?.average_time_on_site, actual?.average_time_on_site))?.toPrecision(2)
    const time = (averageTimeOnsite/60000).toFixed(2)
  return (
   <Card 
   title={"Average time on site"} 
//    amount={ConvertToMilliuseconds(averageTimeOnsite)} 
   amount={time} 
   style={pageData[0] > pageData[pageData.length -1] ? 'text-green-500': pageData[0] === pageData[pageData.length -1] ? 'text-gray-500':'text-red-500' } 
   arrowPosition={arrowPosition}
   percent={Number(per/600) } 
   chart={<ChangeLineChart pageData={pageData}/>}
   />
  )
}
