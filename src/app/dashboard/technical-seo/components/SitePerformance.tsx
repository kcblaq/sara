import { RxQuestionMarkCircled } from "react-icons/rx";
import Card from "../../Card";
import BarChartSingle from "./(technicalseo)/BarChartSingle";
import { QuadProgressBar } from "./(technicalseo)/DualProgressBar";

import { SitePerformanceType } from "@/types/technicalseo/SitePerformance";
import { ConvertToMilliuseconds } from "@/app/utils/ConvertToMilliseconds";
import Loader from "@/app/component/Loader";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";
import {
  CrawlingData,
  SitePerformanceData,
} from "@/types/technicalseo/technicalSeoTypes";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ExploreContentTableColumns } from "../../content-analysis/columns/content-analysis-column";
import { exploreContentTableData } from "../../content-analysis/data/exploreContentTableData";
import { sitePerformanceIssueColumns } from "../column/sitePerformanceIssueColumn";

export default function SitePerformance() {
  const [isPerformanceIssue, setIsPerformanceIssue] = useState(false);
  function isSitePerformanceData(
    data: CrawlingData
  ): data is SitePerformanceData {
    return data.tab === "sitePerformance";
  }

  const { data, isLoading } = useTechnicalSeoFetchData();
  // Extract the `sitePerformance` data
  const sitePerformanceData: SitePerformanceData[] =
    data?.crawlings
      ?.flatMap((crawling: any) => crawling.crawlingData) // Get all crawlingData arrays
      .filter(isSitePerformanceData) ?? []; // Filter by tab = 'sitePerformance'
  console.log("site perf", sitePerformanceData[0]);

  const pageloadSpeedArray = sitePerformanceData[0]?.data.page_load_speed || [];

  const pageloadSpeedTotal =
    sitePerformanceData[0]?.data.page_load_speed.reduce((acc, currentValue) => {
      return (acc += currentValue);
    }, 0) || 0;

  const average_page_load_speed =
    sitePerformanceData[0]?.data.average_page_load_speed || 0;

  const amountJavascriptAndCssLabel: string[] =
    sitePerformanceData[0]?.data.amount_of_javascript.map(
      (item) => `${item.script_count}-${item.stylesheet_count}`
    ) || [];

  const JavascriptCssData =
    sitePerformanceData[0]?.data.amount_of_javascript.map(
      (item) => item.script_count
    ) || [];

  const sitePerformanceIssue =
    sitePerformanceData[0]?.data.performance_issues || [];

  const [metric1, metric2, metric3, metric4] = pageloadSpeedArray.slice(0, 4);

  // Calculate the total sum
  const total = metric1 + metric2 + metric3 + metric4;

  // Convert the numeric values to percentage strings
  const metric1Percentage = `${((metric1 / total) * 100).toFixed(2)}%`;
  const metric2Percentage = `${((metric2 / total) * 100).toFixed(2)}%`;
  const metric3Percentage = `${((metric3 / total) * 100).toFixed(2)}%`;
  const metric4Percentage = `${((metric4 / total) * 100).toFixed(2)}%`;

  const CardClone = (
    <div className="grid gap-4 w-full md:max-w-[390px] h-[226px] rounded-md p-6 pb-2 border">
      <div className="flex w-full justify-between items-center ">
        <h5 className=" font-semibold text-base flex gap-4 items-center">
          {" "}
          Page load speed{" "}
          <button title="Time it take for the page to completely be loaded">
            {" "}
            <RxQuestionMarkCircled />{" "}
          </button>{" "}
        </h5>
        <p className=" text-sm font-normal">{pageloadSpeedTotal} </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* <DualProgressBar leftPercentage={'30'} /> */}
        <QuadProgressBar
          metric1Percentage={metric1Percentage}
          metric2Percentage={metric2Percentage}
          metric3Percentage={metric3Percentage}
          metric4Percentage={metric4Percentage}
        />
        <div className="flex flex-col items-stretch justify-end w-full text-sm text-[#475467]">
          {/* {data &&
            Object.entries(data?.pageLoadSpeed).map(([key, value], index) => {
              return (
                <span
                  key={index}
                  className={`flex items-center gap-4 w-full justify-end`}
                >
                  <span
                    className={` 
                ${index === 0 && "bg-[#12B76A]"} 
                ${index === 1 && "bg-[#2E90FA]"} 
                ${index === 2 && "bg-[#D1E9FF]"} 
                ${index === 3 && "bg-[#FEDF89]"} 
                h-2 w-2 rounded-full`}
                  >
                    {" "}
                  </span>{" "}
                  {key} <b>({value as number} )</b>{" "}
                </span>
              );
            })} */}
          {/* {pageloadSpeedArray > 0 &&
            pageloadSpeedArray &&
            pageloadSpeedArray.map((value, index) => (
              <span
                key={index}
                className="flex items-center gap-4 w-full justify-end"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    index === 0
                      ? "bg-[#12B76A]"
                      : index === 1
                      ? "bg-[#2E90FA]"
                      : index === 2
                      ? "bg-[#D1E9FF]"
                      : index === 3
                      ? "bg-[#FEDF89]"
                      : ""
                  }`}
                ></span>
                Page {index + 1} <b>({value})</b>
              </span>
            ))} */}

          {/* <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#2E90FA] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(1,200)</b> </span>
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#D1E9FF] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(2,300)</b> </span>
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#FEDF89] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(1,100)</b> </span> */}
        </div>
      </div>
    </div>
  );

  return isLoading ? (
    <div className=" w-full h-20 flex items-center justify-center mt-10">
      <Loader />
    </div>
  ) : (
    <main className="grid gap-6 mt-10 h-full">
      <section className=" grid w-full grid-cols-1 md:grid-cols-3 md:gap-6 md:space-y-0 space-y-4 2xl:gap-8 py-4 mb-5">
        {/* <Suspense fallback={<div className=""> Loading...</div>}> */}
        <div className="grid col-span-1 ">
          {/* <Card title={"Average page load speed"} amount={performanceData ? performanceData?.data[1]?.performance : 0} style={""} percent={1} chart={undefined} /> */}
          <div className="flex md:flex-col min-[600px]:flex-row flex-col gap-7 ">
            <Card
              title={"Average page load speed"}
              amount={ConvertToMilliuseconds(average_page_load_speed)}
              style={""}
              percent={1}
              chart={undefined}
            />
            {CardClone}
          </div>
        </div>
        {/* </Suspense> */}
        <div className="col-span-2 border grid rounded-md p-6">
          <div className="flex flex-col w-full">
            <h1
              className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
            >
              Amount of Javascript and CSS
              <button title={`JavaScript and CSS in the website`}>
                {" "}
                <RxQuestionMarkCircled />
              </button>
            </h1>
            <hr className="mt-2 w-full" />
          </div>
          <BarChartSingle
            labels={amountJavascriptAndCssLabel}
            data={JavascriptCssData}
            xAxisLabel="Amount"
            backgroundColor="#53B1FD"
            yAxisLabel="Number of pages"
          />
        </div>
      </section>
      <section className="flex flex-col w-3/4 border rounded-md p-6 mb-20">
        <div className="flex justify-between w-full border-b pb-2">
          <h3 className="text-[#101828] text-xl font-semibold">
            {" "}
            Site performance issues
          </h3>
          <button
            onClick={() => setIsPerformanceIssue(!isPerformanceIssue)}
            className="text-blue-400 cursor-pointer"
          >
            {" "}
            Show{" "}
          </button>
        </div>
        <div className="">
          {isPerformanceIssue && (
            <DataTable
              columns={sitePerformanceIssueColumns}
              data={sitePerformanceIssue}
            />
          )}
        </div>
      </section>
    </main>
  );
}
