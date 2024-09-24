import { RootState } from "@/app/store";
import {
  CrawlingDataOverview,
  OverviewDataType,
} from "@/types/technicalseo/technicalSeoTypes";
import { ActivityRings } from "@jonasdoesthings/react-activity-rings";

// Basic example with no custom settings
import React from "react";
import { useSelector } from "react-redux";

export default function ActivityGuage() {
  // const siteIssues = useSelector(
  //   (state: RootState) => state.technicalSeo.metrics?.siteIssue
  // );
  const siteIssues = useSelector((state: RootState) => state.technicalSeo);

  const overviewResult: OverviewDataType[] = siteIssues.crawlings.flatMap(
    (crawling: any) =>
      crawling.crawlingData
        .filter((data: any) => data.tab === "overview")
        .map((overviewData: CrawlingDataOverview) => ({
          errorsCount: overviewData.data.site_issues.errors.length,
          warningsCount: overviewData.data.site_issues.warnings.length,
        }))
  );

  // Add nullish coalescing to ensure that the values are always numbers
  const errorPercentage = overviewResult[0]?.errorsCount ?? 0;
  const warningPercentage = overviewResult[0]?.warningsCount ?? 0;
  const noticesPercentage = overviewResult[0]?.cost ?? 0;

  return (
    <div className="h-full w-full ">
      <ActivityRings
        rings={[
          { filledPercentage: errorPercentage / 100, color: "#F04438" },
          { filledPercentage: warningPercentage / 100, color: "#FDB022" },
          { filledPercentage: noticesPercentage / 100, color: "#175CD3" },
        ]}
        options={{
          initialRadius: 40,
          animationDurationMillis: 1500,
          containerHeight: "min-content", //30vh
          backgroundOpacity: 0.1,
        }}
      />
    </div>
  );
}
