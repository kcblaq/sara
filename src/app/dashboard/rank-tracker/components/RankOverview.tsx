import React, { useEffect, useState } from "react";
import Card from "../../Card";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import OrganicTrafficCard from "../../technical-seo/components/OrganicTrafficCard";
import {
  ButtonWithTitle,
  Title,
  TitleWithoutUnderline,
} from "../../technical-seo/components/Overview";
import { TrafficOverviewGraph } from "../../components/TrafficOverviewGraph";
import BarChartSingle from "../../technical-seo/components/(technicalseo)/BarChartSingle";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import { useRankTrackingOverview } from "@/app/services/crawlers/rank_tracking";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { LineChart } from "../../technical-seo/components/LineChart";
import { FaArrowUp } from "react-icons/fa";


interface Props {
  se: string
}
export default function RankOverview({ se }: Props) {


  const [isClient, setIsClient] = useState(false);


  const { isError, isPending, isSuccess, data: OverviewData } = useRankTrackingOverview();
  //Traffic Volume
  const route = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data;
  const routePrevious = OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data;
  const google_traffic_volume = route?.google?.organic_traffic?.organic_positions?.etv ?? 0;
  const bing_traffic_volume = route?.bing?.organic_traffic?.organic_positions?.etv ?? 0;

  const googleTvDiff = calculatePercentageDifference(OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data?.google?.organic_traffic?.organic_positions?.etv, google_traffic_volume);

  const bingTvPercentageDiff = calculatePercentageDifference(OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data?.bing?.organic_positions?.etv, bing_traffic_volume);

  function getGoogleTrafficLineGraphData() {
    const googleTrafficVolumeData = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && googleTrafficVolumeData.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && googleTrafficVolumeData.length < 5; j++) {
        const googleTraffic = crawlingData[j]?.data?.google?.organic_positions?.etv;
        if (googleTraffic !== undefined) {
          googleTrafficVolumeData.push(googleTraffic);
        }
      }
    }

    return googleTrafficVolumeData;
  }
  function getBingTrafficLineGraphData() {
    const bingTrafficVolumeData = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && bingTrafficVolumeData.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && bingTrafficVolumeData.length < 5; j++) {
        const BingTraffic = crawlingData[j]?.data?.bing?.organic_positions?.etv;
        if (BingTraffic !== undefined) {
          bingTrafficVolumeData.push(BingTraffic);
        }
      }
    }

    return bingTrafficVolumeData;
  }



  //Search Volume
  const googleData = route?.google?.keyword_ranking[0]?.map((item: { search_volume: number; }) => item.search_volume) || [];
  const bingData = route?.bing?.keyword_ranking[0]?.map((item: { search_volume: number; }) => item.search_volume) || [];

  let googleAverageKeywordRanking = 0;
  if (googleData.length > 0) {
    const googleSum = googleData.reduce((acc: number, num: number) => acc + (num || 0), 0);
    googleAverageKeywordRanking = googleSum / googleData.length;
    // console.log("V", googleAverageKeywordRanking);
  }

  let bingAverageKeywordRanking = 0;
  if (googleData.length > 0) {
    const bingSum = bingData.reduce((acc: number, num: number) => acc + (num || 0), 0);
    googleAverageKeywordRanking = bingSum / bingData.length;
  }

  const googlePrevious = route?.google?.keyword_ranking[1]?.reduce((acc: any, num: any) => acc + num, 0)
  const bingPrevious = route?.bing?.keyword_ranking[1]?.reduce((acc: any, num: any) => acc + num, 0)

  const googleRankingPercentage = calculatePercentageDifference(googlePrevious, googleAverageKeywordRanking);
  const bingRankingPercentage = calculatePercentageDifference(bingPrevious, bingAverageKeywordRanking);




  //   !isPending && console.log("OVDATA", OverviewData.project.crawlings[0].crawlingData[0].data.bing.organic_positions
  // .etv  )

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }


  // Keyword Ranking
  const google_positions = route?.google.organic_positions;
  const previous_google_positions = route?.google.organic_positions;
  const bing_positions = route?.bing?.organic_positions;



  const pos_31_and_above = google_positions?.pos_31_40 + google_positions?.pos_41_50 + google_positions?.pos_51_60 + google_positions?.pos_61_70 + google_positions?.pos_71_80 + google_positions?.pos_81_90 + google_positions?.pos_91_100

  const previous_pos_31_and_above = previous_google_positions?.pos_31_40 + previous_google_positions?.pos_41_50 + previous_google_positions?.pos_51_60 + previous_google_positions?.pos_61_70 + previous_google_positions?.pos_71_80 + previous_google_positions?.pos_81_90 + previous_google_positions?.pos_91_100

  const keywordDisDiff = {
    google: {
      "2-3": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_2_3, route?.google?.organic_positions.pos_2_3),
      "4-10": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_4_10, routePrevious?.google?.organic_positions?.pos_4_10),
      "11-20": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_11_20, routePrevious?.google?.organic_positions?.pos_11_20),
      "21-30": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_21_30, routePrevious?.google?.organic_positions?.pos_21_30),
      "Above 30": calculatePercentageDifference(previous_pos_31_and_above, pos_31_and_above),

    },
    bing: {

    }

  }

  function Truncate(num: number) {
    return Math.round(num * 10) / 10
  }

  // console.log("V", bing_positions)


  return (
    <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto">
      <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        <OrganicTrafficCard />
        <Card
          isLoading={isPending}
          isError={isError}
          title={"Traffic Volume"}
          amount={se == "google" ? google_traffic_volume : bing_traffic_volume}
          style={se === "google" ? (
            googleTvDiff === 0 ? "text-gray-500"
              : googleTvDiff > 0 ? "text-green-500" : "text-red-500"
          ) :
            (
              bingTvPercentageDiff === 0 ? "text-gray-500"
                : bingTvPercentageDiff > 0 ? "text-green-500" : "text-red-500"
            )
          }
          percent={se === "google" ? googleTvDiff : bingTvPercentageDiff}
          chart={<LineChart pageData={se === "google" ? getGoogleTrafficLineGraphData() : getBingTrafficLineGraphData()} />}
        />
        <Card
          title={"Search Volume"}
          amount={se === "google" ? googleAverageKeywordRanking ?? 0 : bingAverageKeywordRanking ?? 0}
          style={se == "google" ?
            (googleAverageKeywordRanking === 0 ? "text-gray-500"
              : googleAverageKeywordRanking > 0 ? "text-green-500" : "text-red-500"
            )
            :
            (
              bingRankingPercentage === 0 ? "text-gray-500"
                : bingRankingPercentage > 0 ? "text-green-500" : "text-red-500"
            )
          }
          percent={se === "google" ? googleRankingPercentage : bingRankingPercentage}
          chart={undefined}
        />
      </section>
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
        <div
          className={` col-span-1 min-[375px]:min-w-[330px] grid p-6 gap-3 rounded-md border shadow-sm w-full`}
        >
          <TitleWithoutUnderline
            title={"Keyword ranking "}
            info={"Keyword ranking "}
          />
          <div className="w-full rounded-xl border shadow-sm content-start justify-between ">
            <table className="py-4 w-full  table-fixed">
              <thead className=" bg-[#EAECF0] h-12 rounded-md">
                <tr className="rounded-md">
                  <th className="font-medium text-xs text-[#475467] rounded-tl-xl text-left p-2">
                    Positions
                  </th>
                  <th className="font-medium text-xs text-[#475467] text-left p-2 ">
                    <span className={`flex items-center gap-1`}>
                      {" "}
                      Number <ButtonWithTitle info={"More or less keywords"} />
                    </span>
                  </th>
                  <th className="font-medium text-xs text-[#475467] rounded-tr-xl text-left p-2 ">
                    <span className={`flex items-center gap-1`}>
                      {" "}
                      Changes{" "}
                      <ButtonWithTitle info={"Changes in rank position"} />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border-b">
                  <td className=" p-2 ">2 - 3</td>
                  <td className=" p-2 ">{(google_positions?.pos_2_3)?.toFixed(1)} </td>
                  <td className="  p-2 rounded-full">


                  <span className={`p-2 rounded-full flex items-center gap-1
                      ${keywordDisDiff.google["2-3"] > 0 ? "bg-green-200"
                        : keywordDisDiff.google["2-3"] < 0 ? "bg-red-400"
                          : "bg-gray-200"
                      }
                      `}><FaArrowUp className={`
                        ${keywordDisDiff.google["2-3"] > 0 ? "text-green-500"
                          : keywordDisDiff.google["2-3"] < 0 ? "text-red-400 rotate-180"
                            : "text-gray-500"
                        }
                      `} />{keywordDisDiff.google["2-3"].toFixed(1)} </span>


                  </td>
                </tr>
                <tr className="border-b">
                  <td className=" p-2 ">4 - 10</td>
                  <td className=" p-2 "> {google_positions?.pos_4_10} </td>
                  <td className="  p-2 rounded-full">


                  <span className={`p-2 rounded-full flex items-center gap-1
                      ${keywordDisDiff.google["4-10"] > 0 ? "bg-green-200"
                        : keywordDisDiff.google["4-10"] < 0 ? "bg-red-400"
                          : "bg-gray-200"
                      }
                      `}><FaArrowUp className={`
                        ${keywordDisDiff.google["4-10"] > 0 ? "text-green-500"
                          : keywordDisDiff.google["4-10"] < 0 ? "text-red-400 rotate-180"
                            : "text-gray-500"
                        }
                      `} />{keywordDisDiff.google["4-10"]} </span>
                      
                    
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="w-1/3 p-2 ">11 - 20</td>
                  <td className="w-1/3 p-2 "> {google_positions?.pos_11_20} </td>
                  <td className="  p-2 rounded-full">


                  <span className={`p-2 rounded-full flex items-center gap-1
                      ${keywordDisDiff.google["11-20"] > 0 ? "bg-green-200"
                        : keywordDisDiff.google["11-20"] < 0 ? "bg-red-400"
                          : "bg-gray-200"
                      }
                      `}><FaArrowUp className={`
                        ${keywordDisDiff.google["11-20"] > 0 ? "text-green-500"
                          : keywordDisDiff.google["11-20"] < 0 ? "text-red-400 rotate-180"
                            : "text-gray-500"
                        }
                      `} />{keywordDisDiff.google["11-20"]} </span>


                  </td>
                </tr>
                <tr className="">
                  <td className="w-1/3 p-2 ">21 - 30</td>
                  <td className="w-1/3 p-2 ">{google_positions?.pos_21_30} </td>
                  <td className="  p-2 rounded-full">



                    <span className={`p-2 rounded-full flex items-center gap-1
                      ${keywordDisDiff.google["21-30"] > 0 ? "bg-green-200"
                        : keywordDisDiff.google["21-30"] < 0 ? "bg-red-400"
                          : "bg-gray-200"
                      }
                      `}><FaArrowUp className={`
                        ${keywordDisDiff.google["21-30"] > 0 ? "text-green-500"
                          : keywordDisDiff.google["21-30"] < 0 ? "text-red-400 rotate-180"
                            : "text-gray-500"
                        }
                      `} />{keywordDisDiff.google["21-30"]} </span>


                  </td>
                </tr>
                <tr className="">
                  <td className="w-1/3 p-2 ">Above 31</td>
                  <td className="w-1/3 p-2 "> {pos_31_and_above} </td>
                  <td className="  p-2 rounded-full">
                    <span className={`p-2 rounded-full flex items-center gap-1
                      ${keywordDisDiff.google["Above 30"] > 0 ? "bg-green-200"
                        : keywordDisDiff.google["Above 30"] < 0 ? "bg-red-400"
                          : "bg-gray-200"
                      }
                      `}><FaArrowUp className={`
                        ${keywordDisDiff.google["Above 30"] > 0 ? "text-green-500"
                          : keywordDisDiff.google["Above 30"] < 0 ? "text-red-400 rotate-180"
                            : "text-gray-500"
                        }
                      `} />{keywordDisDiff.google["Above 30"]} </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`lg:col-span-2 col-span-1 grid p-6 gap-3 rounded-md border shadow-sm w-full`}
        >
          <TitleWithoutUnderline
            title={"Position distributions "}
            info={"Position distributions"}
          />
          <BarChartSingle
            labels={[]}
            data={[]}
            xAxisLabel="Month"
            yAxisLabel="Number of Visitors"
          />
        </div>
      </section>
    </main>
  );
}
