import { calculatePercentage, millisecondsToSeconds } from "@/lib/DateFormater";
import Card from "../../Card";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ChangeLineChart from "@/app/component/charts/Bars";

export default function AverageTimeOnsite() {
    const { loading, error, metrics } = useSelector((state: RootState) => state.performance);
    
    const scores = metrics && metrics?.history.scores;
    const previosUpdate = metrics?.history.scores[scores && scores.length > 0 ? scores.length - 2 : 0];
    const lastThreepreviosUpdate = metrics?.history.scores[scores && scores.length > 0 ? scores.length - 3 : 0];
    const actual = metrics?.history.scores[scores && scores.length > 0 ? scores?.length - 1 : 0];
    const averageTimeOnsite = actual?.average_time_on_site ?? 0;

    const averageTimeonsiteIncrease = previosUpdate?.average_time_on_site !== undefined && previosUpdate.average_time_on_site < averageTimeOnsite ? "true"
        : previosUpdate?.average_time_on_site !== undefined && previosUpdate?.average_time_on_site == averageTimeOnsite ? "nil" : "false";

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


    const per = millisecondsToSeconds(TrafficIncreasePercentage(lastThreepreviosUpdate?.average_time_on_site, actual?.average_time_on_site))?.toPrecision(2)
    const timeChange = TrafficIncreasePercentage(previosUpdate?.average_time_on_site,actual?.average_time_on_site )
    const change = timeChange && millisecondsToSeconds(timeChange)
    const percent = Number(change)
    const checkPercentage = TrafficIncreasePercentage(previosUpdate?.average_time_on_site, actual?.average_time_on_site)

  return (
   <Card 
   title={"Average time on site"} 
   amount={averageTimeOnsite} 
   style={Number(per) < 0 ? "text-red-500" : Number(per) == 0 ? "text-gray-500" : "text-green-500"} 
//    arrowPosition={checkPercentage == 0 ? "rotate-90" : checkPercentage < 0 ? "rotate-180" : ""}
   arrowPosition={Number(per) < 0 ? "rotate-180" : Number(per) == 0 ? "rotate-90" : ""}
   percent={Number(per)} 
   chart={<ChangeLineChart data1={extractFields()[0]} data2={extractFields()[1]} data3={extractFields()[2]} data4={extractFields()[3]} />}
   />
  )
}
