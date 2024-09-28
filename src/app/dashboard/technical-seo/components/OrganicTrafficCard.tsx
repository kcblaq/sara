import Card from "../../Card";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { LineChart } from "./LineChart";
import { useRankTrackingOverview } from "@/app/services/crawlers/rank_tracking";

export default function OrganicTrafficCard() {

  const { isError, isPending, data: OverviewData } = useRankTrackingOverview();
  const organicTraffic = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data?.google?.organic_traffic ?? 0;
  const previousVal = OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data?.google?.organic_traffic ?? 0;

  const percentageDiff = calculatePercentageDifference(previousVal, organicTraffic);

  function getFirstFiveOrganicTraffic() {
    const organicTrafficArray = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && organicTrafficArray.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && organicTrafficArray.length < 5; j++) {
        const organicTraffic = crawlingData[j]?.data?.google?.organic_traffic;
        if (organicTraffic !== undefined) {
          organicTrafficArray.push(organicTraffic);
        }
      }
    }

    return organicTrafficArray;
  }

  // console.log("FIRSTFIV:",getFirstFiveOrganicTraffic())

  return (
    <Card
      isLoading={isPending}
      isError={isError}
      title={"Organic Traffic"}
      amount={ShortenNumber(organicTraffic) ?? 0}
      style={
        percentageDiff === 0 ? "text-gray-500"
          : percentageDiff > 0 ? "text-green-500" : "text-red-500"
      }
      percent={percentageDiff}
      chart={<LineChart pageData={getFirstFiveOrganicTraffic()} />}
      arrowPosition={
        percentageDiff < 0 ? "rotate-180" : ""
      }
    />
  );
}
