import { RxQuestionMarkCircled } from "react-icons/rx";
// import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle"
import SubHead from "./(technicalseo)/SubHead";
import PieChart from "./(technicalseo)/PieChart";
import { FaCircle } from "react-icons/fa6";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { GoDotFill } from "react-icons/go";
import PlainButton from "@/app/component/PlainButton";
import FilledButton from "@/app/component/FilledButton";
import { FiDownloadCloud } from "react-icons/fi";
import TableItems from "./(technicalseo)/TableItems";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { calculatePercentage } from "@/app/utils/PercentageCalculate";
import ActivityGuage from "./(technicalseo)/ActivityGuage";
import HTTPStatusCode from "./HTTPStatusCode";
// import { TechnicalSeoType } from "@/types/TechnicalSeoType";
import SiteHealthScore from "../../components/SiteHealthScore";
import { DoughnutSample } from "../../components/DoiughnutSample";
import { CrawledPages } from "../../components/SeoprogressCircle";
import {
  CrawlingDataOverview,
  OverviewDataType,
} from "@/types/technicalseo/technicalSeoTypes";
import ReusableHTTPStatusCode from "./(technicalseo)/ReusableHTTPStatusCode";
// import { TechnicalSeoType } from "@/types/TechnicalSeoType";
// import { useEffect } from "react";
// import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
// import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
// import { setLoading } from "@/redux/features/loaderSlice";
// import { setTechnicalSeo, fetchTechnicalSEOFailure } from "@/redux/features/technicalSeoSlice";
// import { useDispatch } from "react-redux";
// import { FetchTechnicalSeo } from "./FetchTechnicalSeo";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface ItemProps {
  title: string;
  data: ChartData;
  goodPages: number;
  needsImprovementPages: number;
  poorPages: number;
  info: string;
}

export const Title = ({
  title,
  info,
  className,
}: {
  title: string;
  info: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col w-full  h-fit">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl ${className}`}
      >
        {title}
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
      <hr className="mt-2 w-full" />
    </div>
  );
};
export const TitleWithoutUnderline = ({
  title,
  info,
}: {
  title: string;
  info: string;
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
      >
        {title}
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
    </div>
  );
};
export const ButtonWithTitle = ({ info }: { info: string }) => {
  return (
    <div className="flex flex-col w-full">
      <h1
        className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}
      >
        <button title={info}>
          {" "}
          <RxQuestionMarkCircled />
        </button>
      </h1>
    </div>
  );
};

function Overview() {
  const technicalSeoData: any = useSelector(
    (state: RootState) => state.technicalSeo
  );
  // console.log(technicalSeoData);
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );
  const statusCodeData = technicalSeoData?.metrics?.httpStatusCode
    ? technicalSeoData.metrics.httpStatusCode[0]
    : null;
  const issues = technicalSeoData?.metrics?.siteIssue
    ? technicalSeoData?.metrics?.siteIssue?.issues
    : null;
  // console.log("ISSUES", issues)

  // const dispatch = useDispatch()

  //   const FetchTechnicalSeo = async () => {
  //     try {
  //         setLoading(true);
  //         await ApiCall.get('/crawl/technical-seo', {
  //             params: {
  //                 limit: 100,
  //                 platform:'desktop',
  //                 url: removeTrailingSlash(activeProperty),
  //             }
  //         }).then((res) => dispatch(setTechnicalSeo(res.data)));
  //     } catch (error:any) {
  //         dispatch(fetchTechnicalSEOFailure(error.message));
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const overviewResult: OverviewDataType[] = technicalSeoData.crawlings.flatMap(
    (crawling: any) =>
      crawling.crawlingData
        .filter((data: any) => data.tab === "overview")
        .map((overviewData: CrawlingDataOverview) => ({
          crawlId: overviewData.id,
          coreWebVital: overviewData.data.core_web_vitals,
          cost: overviewData.data.cost,
          siteHealth: overviewData.data.site_health,
          Issues: overviewData.data.issues,
          status_code: overviewData.data.status_code,
          errorsCount: overviewData.data.site_issues.errors.length,
          warningsCount: overviewData.data.site_issues.warnings.length,
          tasksCount: overviewData.data.tasks_count,
          pagesCrawled: overviewData.data.crawl_status.pages_crawled,
          pagesInQueue: overviewData.data.crawl_status.pages_in_queue,
          maxCrawlPages: overviewData.data.crawl_status.max_crawl_pages,
          crawlProgress: overviewData.data.crawl_progress,
          timeToInteractive: overviewData.data.time_to_interactive,
          cumulativeLayoutShift: overviewData.data.cumulative_layout_shift,
          largestContentfulPaint: overviewData.data.largest_contentful_paint,
          createdAt: overviewData.createdAt,
          updatedAt: overviewData.updatedAt,
        }))
  );

  const LcpAnalysis = overviewResult[0].coreWebVital.largest_contentful_paint;
  const CLSAnalysis = overviewResult[0].coreWebVital.cumulative_layout_shift;

  console.log(overviewResult[0]);
  const LcpLabel = [
    String(LcpAnalysis.poor),

    String(LcpAnalysis.needs_improvement),
    String(LcpAnalysis.good),
  ];
  const LCPdata: ItemProps["data"] = overviewResult
    ? {
        // labels: Object.keys(technicalSeoData.metrics?.lcp ?? {}),
        labels: LcpLabel,
        datasets: [
          {
            label: "Total",
            // data: Object.values(technicalSeoData.metrics?.lcp ?? {}),
            data: LcpLabel.map((lcp) => Number(lcp) || 0),
            backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
            borderColor: ["#F04438", "#FDB022", "#12B76A"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const CLSLabel = [
    String(CLSAnalysis.poor),

    String(CLSAnalysis.needs_improvement),
    String(CLSAnalysis.good),
  ];
  const CLSdata: ItemProps["data"] = CLSAnalysis
    ? {
        // labels: Object.keys(technicalSeoData.metrics?.cls ?? {}),
        labels: CLSLabel,
        datasets: [
          {
            label: "Total",
            // data: Object.values(technicalSeoData.metrics?.cls ?? {}),
            data: CLSLabel.map((cml) => Number(cml) || 0),
            backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
            borderColor: ["#F04438", "#FDB022", "#12B76A"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const TBTdata: ItemProps["data"] =
    technicalSeoData && technicalSeoData.metrics && technicalSeoData.metrics.tbt
      ? {
          labels: Object.keys(technicalSeoData.metrics.tbt),
          datasets: [
            {
              label: "Total",
              data: Object.values(technicalSeoData.metrics.tbt),
              backgroundColor: ["#F04438", "#FDB022", "#12B76A"],
              borderColor: ["#F04438", "#FDB022", "#12B76A"],
              borderWidth: 1,
            },
          ],
        }
      : { labels: [], datasets: [] };

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };
  const EachItem = ({
    title,
    info,
    data,
    poorPages,
    needsImprovementPages,
    goodPages,
  }: ItemProps) => {
    return (
      <section className="grid gap-3 md:gap-6 justify-center h-full">
        <h1
          className={`text-[#101828] flex text-sm font-semibold items-center gap-2`}
        >
          {title}
          <button title={info}>
            <RxQuestionMarkCircled className="text-gray-400" />
          </button>
        </h1>
        <div className="flex w-40">
          <PieChart data={data} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-red-500 text-xs" />
            <p className="text-sm font-normal"> {`Poor(${poorPages}) `} </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-yellow-500 text-xs" />
            <p className="text-sm font-normal">
              {" "}
              {`Needs Improvements(${needsImprovementPages}) `}{" "}
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className="text-green-500 text-xs" />
            <p className="text-sm font-normal"> {`Good(${goodPages}) `} </p>
          </div>
        </div>
      </section>
    );
  };

  // console.log("SEOT",technicalSeoData)
  const value = technicalSeoData.metrics?.crawled;
  const total = technicalSeoData.metrics?.crawled?.total;
  const crawledvalue = calculatePercentage(
    value ? Number(value) : 0,
    Number(total)
  );

  return (
    <main className="pb-14 mt-10 grid w-full gap-8 z-0 ">
      <section
        className={`grid grid-cols-1 md:grid-cols-4 md:gap-4 md:space-y-0 space-y-4 w-full`}
      >
        {/* <div className="w-full col-span-1 h-full md:h-[464px]  border rounded-md p-6"> */}
        {/* <ReusableProgressiveCircle title="Site health" info="The overall site health rating" val={(technicalSeoData.data[0].site_health * 100).toFixed(0)} pageTitle={"Site health"} /> */}

        <SiteHealthScore />

        {/* </div> */}
        <section className="w-full h-full col-span-3 md:h-[464px] border rounded-md p-6">
          <SubHead
            title="Core web vitals"
            info="These are a set of specific factors that Google considers important in assessing the user experience of a web page"
          />
          <div className="grid w-full h-full items-center justify-between grid-col-1 lg:grid-cols-3 min-[540px]:grid-cols-2 py-6 overflow-y-auto">
            {/* <EachItem title="Largest Contentful Paint (LCP)" data={LCPdata} poorPages={technicalSeoData.metrics.lcp.poor} needsImprovementPages={technicalSeoData.lcp.needsImprovement} goodPages={technicalSeoData.lcp.good} info={"Largest Contentful Paint (LCP) is a user-centric performance metric that measures the perceived loading speed of a web page. It specifically focuses on the time it takes for the largest content element, such as an image or a block of text, to render on the user's screen"} /> */}
            <EachItem
              title="Largest Contentful Paint (LCP)"
              data={LCPdata}
              poorPages={LcpAnalysis.poor || 0}
              needsImprovementPages={LcpAnalysis.needs_improvement || 0}
              goodPages={LcpAnalysis.good || 0}
              info={
                "Largest Contentful Paint (LCP) is a user-centric performance metric that measures the perceived loading speed of a web page. It specifically focuses on the time it takes for the largest content element, such as an image or a block of text, to render on the user's screen"
              }
            />
            <EachItem
              title="Total Blocking Time (TBT)"
              data={TBTdata}
              poorPages={technicalSeoData?.metrics?.tbt?.poor || 0}
              needsImprovementPages={
                technicalSeoData?.metrics?.tbt?.needsImprovement || 0
              }
              goodPages={technicalSeoData?.metrics?.tbt?.good || 0}
              info={
                "This is a user-centric performance metric used to evaluate the responsiveness and interactivity of a web page"
              }
            />
            <EachItem
              title="Cumulative Layout Shift (CLS)"
              data={CLSdata}
              poorPages={CLSAnalysis.poor || 0}
              needsImprovementPages={CLSAnalysis.needs_improvement || 0}
              goodPages={CLSAnalysis.good || 0}
              info={
                "This is a user-centric performance metric that quantifies the visual stability of a web page as it loads and interacts with the user"
              }
            />
          </div>
        </section>
      </section>
      <section className="grid  gap-4 justify-items-stretch h-full w-full grid-cols-1 md:grid-cols-3  min-[540px]:grid-cols-2">
        <div className=" p-2 md:p-4 col-span-1 h-[308px] justify-items-start rounded-md w-full border">
          <Title
            title={"Crawl status"}
            info="The status of the crawl result"
            className="font-bold"
          />
          <div className="p-2 flex lg:flex-row flex-col w-full h-fit ">
            {/* <CircularProgressbarWithChildren value={crawledvalue} className='h-48' styles={{
              path: { stroke: crawledvalue < 40 ? '#D92D20' : crawledvalue > 40 && crawledvalue < 71 ? '#FDB022' : '#039855' }
            }} >
              <div className="flex flex-col">
                <p className='text-gray-600 text-center text-sm'> Total links found </p>
                <p className='text-gray-900 text-center text-5xl'> {Number(technicalSeoData.metrics?.crawled?.total).toLocaleString()} </p>
              </div>
            </CircularProgressbarWithChildren> */}
            <div className="h-fit object-contain">
              <CrawledPages />
            </div>

            <div className="flex flex-col w-full self-end">
              <p className=" flex items-center text-xs text-[#475467]">
                <span className="text-green-300">
                  <GoDotFill />{" "}
                </span>
                Crawled{" "}
                <strong className="ml-0.5">
                  (
                  {/* {technicalSeoData.metrics?.crawled?.crawled.toLocaleString() ??
                    0} */}
                  {overviewResult[0]?.pagesCrawled ?? 0})
                </strong>
              </p>
              <p className=" flex items-center text-xs text-[#475467]">
                {" "}
                <span className="text-green-100">
                  <GoDotFill />
                </span>{" "}
                Uncrawled{" "}
                <strong className="ml-0.5">
                  (
                  {/* {technicalSeoData?.metrics?.crawled?.uncrawled.toLocaleString() ??
                    0} */}
                  {overviewResult[0]?.pagesInQueue ?? 0}) )
                </strong>
              </p>
            </div>
          </div>
        </div>
        {/* <ReusableProgressiveCircle val={0} title={""} pageTitle={""} /> */}
        <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start  rounded-md w-full border ">
          <Title
            title="HTTP status codes"
            info="The returned code status that indicate what the response is"
          />
          <div className="p-4 flex lg:flex-row flex-col gap-2 h-48 w-full">
            <ReusableHTTPStatusCode item={overviewResult[0].status_code} />
            {/* <div className="flex flex-col justify-end  overflow-y-auto">
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-green-400">
                  <GoDotFill />{" "}
                </span>
                {`Info - 1xx (${statusCodeData?.info}) `}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-green-600">
                  <GoDotFill />{" "}
                </span>{" "}
                {`Success - 2xx (${statusCodeData?.success}) `}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-orange-400">
                  <GoDotFill />{" "}
                </span>
                {`Redirect - 3xx (${statusCodeData?.redirect}) `}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-red-400">
                  <GoDotFill />{" "}
                </span>{" "}
                {`Client error - 4xx (${statusCodeData?.client_error})`}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-red-200">
                  <GoDotFill />{" "}
                </span>{" "}
                {`Server error - 5xx (${statusCodeData?.server_error})`}{" "}
              </p>
            </div> */}
          </div>
        </div>
        <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start rounded-md w-full border ">
          <Title
            title="Site issues"
            info="All issues associated with thw website"
          />
          <div className="p-4 lg:flex-row flex-col gap-2 h-48  w-full">
            <ActivityGuage />
            <div className="flex flex-col items-end justify-end w-full">
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-[#F04438]">
                  <GoDotFill />{" "}
                </span>{" "}
                {/* {`Errors(${technicalSeoData.metrics?.siteIssue?.error || 0} )`}{" "} */}
                {`Errors(${overviewResult[0]?.errorsCount || 0} )`}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-[#FDB022]">
                  <GoDotFill />{" "}
                </span>{" "}
                {/* {`Warnings(${
                  technicalSeoData.metrics?.siteIssue?.warning || 0
                })`}{" "} */}
                {`Warnings(${overviewResult[0]?.warningsCount || 0})`}{" "}
              </p>
              <p className=" text-xs flex items-center text-[#475467]">
                {" "}
                <span className="text-[#175CD3]">
                  <GoDotFill />{" "}
                </span>{" "}
                {`Notices(${
                  technicalSeoData.metrics?.siteIssue?.notices || 0
                })`}{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid border rounded-md lg:max-w-[75%] w-auto">
        <div className=" flex items-center justify-between">
          <div className="flex min-[500px]:flex-row flex-col w-full gap-2 p-2 md:p-4 min-[500px]:items-center justify-between">
            <h1
              className={`text-[#101828] gap-3 flex items-center font-semibold sm:text-lg`}
            >
              Top issues
              <RxQuestionMarkCircled className="text-gray-400" />
            </h1>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex">
                <PlainButton
                  className="min-[500px]:text-sm text-xs"
                  title="View all issues"
                />
              </div>
              <div className="flex ">
                <FilledButton
                  className="min-[500px]:text-sm text-xs"
                  icon={<FiDownloadCloud />}
                  title="Export issues"
                  handleClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full border-collapse">
            <thead className="p-4">
              <tr className="bg-[#EAECF0] p-4 font-medium text-start">
                <th className="border w-[390px] text-xs text-[#475467] text-start border-[#c0c2c5] p-2">
                  Issues
                </th>
                <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2">
                  Affected Pages
                </th>
                <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2">
                  Fixed
                </th>
                <th className="border text-xs flex-1 text-[#475467] text-start border-[#c0c2c5] p-2">
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {issues &&
                issues.slice(0, 7).map((issue: any) => {
                  return (
                    <tr className=" p-2 font-medium" key={issue.title}>
                      <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                        <TableItems
                          title={issue.title}
                          src={
                            issue.issue_category == "Error"
                              ? "/dashboard/error.svg"
                              : issue.issue_category == "Warning"
                              ? "/dashboard/warning.png"
                              : issue.issue_category == "Notice"
                              ? "/dashboard/notices.svg"
                              : "/dashboard/warning.svg"
                          }
                          description={issue.description}
                          fix={issue.fix}
                        />
                      </td>
                      <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                        {issue.url}{" "}
                      </td>
                      <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                        {issue.fixedStatus}{" "}
                      </td>
                      <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">
                        {issue.count}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Overview;
