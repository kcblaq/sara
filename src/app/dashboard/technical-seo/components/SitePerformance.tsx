import { RxQuestionMarkCircled } from "react-icons/rx";
import Card from "../../Card";
import { completeArray } from "../../components/graphs/StackedBarChart";
import BarChartSingle from "./(technicalseo)/BarChartSingle";
// import { Title } from "./Overview";
// import { HorizontalStackedChart } from "@/app/component/charts/HorizontalStackedChart";
import { QuadProgressBar } from "./(technicalseo)/DualProgressBar";
// import { GoDotFill } from "react-icons/go";
import {  useEffect, useState } from "react";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";
import { SitePerformanceType } from "@/types/technicalseo/SitePerformance";
import { ConvertToMilliuseconds } from "@/app/utils/ConvertToMilliseconds";
import Loader from "@/app/component/Loader";

export default function SitePerformance() {

  const [performanceData, setPerformanceData] = useState<SitePerformanceType | any>(null);
  const [loading, setLoading] = useState(false);
  const [_Err, setErr] = useState({
    status: false,
    message: ''
  });
  // const { metrics } = useSelector((state: RootState) => state.technicalSeo);
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty);

  const arr = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-100', '100+']
  // const cssData = performanceData.
  // console.log("PERF", performanceData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiCall.get('/crawl/technical-seo', {
          params: {
            limit: 100,
            platform: 'desktop',
            url: removeTrailingSlash(activeProperty),
            page: 'site_performance'
          }
        });
        setPerformanceData(response.data);
        // console.log("RES", response.data.data);
      } catch (error: any) {
        setErr({
          status: true,
          message: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [activeProperty]);

  // console.log("SITEPERF:", performanceData?.data[0].performance)

  const CardClone =
    <div className="grid gap-4 w-full max-w-[390px] h-[226px] rounded-md p-6 pb-2 border ">
      <div className="flex w-full justify-between items-center">
        <h5 className=" font-semibold text-base flex gap-4 items-center">  Page load speed  <button title="Time it take for the page to completely be loaded"> <RxQuestionMarkCircled /> </button> </h5>
        <p className=" text-sm font-normal"> </p>
      </div>


      <div className="flex flex-col gap-4">
        {/* <DualProgressBar leftPercentage={'30'} /> */}
        <QuadProgressBar metric1Percentage={"20%"} metric2Percentage={"20%"} metric3Percentage={"40%"} metric4Percentage={"20%"} />
        <div className="flex flex-col items-stretch justify-end w-full text-sm text-[#475467]">
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#12B76A] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(2,000)</b> </span>
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#2E90FA] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(1,200)</b> </span>
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#D1E9FF] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(2,300)</b> </span>
          <span className="flex items-center gap-4 w-full justify-end"> <span className=" bg-[#FEDF89] h-2 w-2 rounded-full" > </span> 0 - 0.5sec <b>(1,100)</b> </span>

        </div>
      </div>
    </div>
  const cssData = performanceData && Object.values(performanceData.count_css) || []
  return (
    loading ? <div className=" w-full h-20 flex items-center justify-center mt-10"> <Loader /> </div> :
      <main className="grid gap-6 mt-10">
        <section className=" grid w-full grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8 py-4 ">
          {/* <Suspense fallback={<div className=""> Loading...</div>}> */}
          <div className="grid col-span-1 gap-7 ">
            {/* <Card title={"Average page load speed"} amount={performanceData ? performanceData?.data[1]?.performance : 0} style={""} percent={1} chart={undefined} /> */}

            <Card
              title={"Average page load speed"}
              amount={
                ConvertToMilliuseconds(performanceData?.average_load_speed?.values ?? 0)
              }
              style={""}
              percent={1}
              chart={undefined}
            />
            {CardClone}
          </div>
          {/* </Suspense> */}
          <div className="col-span-2 border grid rounded-md p-6">
            <div className="flex flex-col w-full">
              <h1 className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}>
                Amount of Javascript and CSS
                <button title={`JavaScript and CSS in the website`}>  <RxQuestionMarkCircled /></button>
              </h1>
              <hr className='mt-2 w-full' />
            </div>
            <BarChartSingle labels={arr} data={cssData} xAxisLabel="Amount" backgroundColor="#53B1FD" yAxisLabel="Number of pages" />
          </div>
        </section>
        <section className="flex w-1/2 justify-between gap-32 border rounded-md items-center p-6 mb-20">
          {/* <h3 className="text-[#101828] text-xl"> Site performance issues</h3>
        <button className="text-blue-400 cursor-pointer"> Show  </button> */}
        </section>
      </main>
  )
}
