import React, { useEffect, useState } from "react";
import Card from "../../Card";
import OrganicTrafficCard from "../../technical-seo/components/OrganicTrafficCard";
import {
  ButtonWithTitle,
  TitleWithoutUnderline,
} from "../../technical-seo/components/Overview";
import { useRankTrackingOverview } from "@/app/services/crawlers/rank_tracking";
import { calculatePercentageDifference } from "@/lib/DateFormater";
import { LineChart } from "../../technical-seo/components/LineChart";
import { FaArrowUp } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import moment from "moment";


interface Props {
  se: string
}
export default function RankOverview() {
  const [se, setSe] = useState("google")


  const [isClient, setIsClient] = useState(false);


  const { isError, isPending, isSuccess, data: OverviewData } = useRankTrackingOverview("overview");
  //Traffic Volume
  const route = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data;
  const routePrevious = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data ?? 0;

  // console.log("PRE",routePrevious)


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

  function getGoogleNewRankingGraphData() {
    const googleNewRankingElement = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && googleNewRankingElement.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && googleNewRankingElement.length < 5; j++) {
        const newRank = crawlingData[j]?.data?.google?.new_ranking_elements;
        if (newRank !== undefined) {
          googleNewRankingElement.push(newRank);
        }
      }
    }

    return googleNewRankingElement;
  }
  function getBingNewRankingGraphData() {
    const bingNewRankingElement = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && bingNewRankingElement.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && bingNewRankingElement.length < 5; j++) {
        const newRank = crawlingData[j]?.data?.bing?.new_ranking_elements;
        if (newRank !== undefined) {
          bingNewRankingElement.push(newRank);
        }
      }
    }

    return bingNewRankingElement;
  }


  //Search Volume
  // const googleData = route?.google?.keyword_ranking[0]?.map((item: { search_volume: number; }) => item.search_volume) || [];
  // const bingData = route?.bing?.keyword_ranking[0]?.map((item: { search_volume: number; }) => item.search_volume) || [];

  const googleData = route?.google?.keyword_ranking?.[0]?.map((item: { search_volume: any; }) => item.search_volume) || [];
  const bingData = route?.bing?.keyword_ranking?.[0]?.map((item: { search_volume: any; }) => item.search_volume) || [];

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

  // const googlePrevious = route?.google?.keyword_ranking[1]?.reduce((acc: any, num: any) => acc + num, 0)
  // const bingPrevious = route?.bing?.keyword_ranking[1]?.reduce((acc: any, num: any) => acc + num, 0)




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
  const google_featured_snippet = route?.google?.featured_snippet?.toFixed(2) ?? 0;
  const bing_featured_snippet = route?.bing?.featured_snippet?.toFixed(2) ?? 0;
  const gfs_percentage = calculatePercentageDifference(routePrevious?.google?.featured_snippet?.toFixed(2) ?? 0, google_featured_snippet)
  const bfs_percentage = calculatePercentageDifference(routePrevious?.bing?.featured_snippet?.toFixed(2) ?? 0, bing_featured_snippet)

  //New ranking
  const google_new_ranking = route?.google?.new_ranking_elements?.toFixed(2) ?? 0;
  const bing_new_ranking = route?.bing?.new_ranking_elements?.toFixed(2) ?? 0;
  const google_new_ranking_perc = calculatePercentageDifference(routePrevious?.google?.new_ranking_elements ?? 0, google_new_ranking)
  const bing_new_ranking_perc = calculatePercentageDifference(routePrevious?.bing?.new_ranking_elements ?? 0, bing_new_ranking)


  const pos_31_and_above = google_positions?.pos_31_40 + google_positions?.pos_41_50 + google_positions?.pos_51_60 + google_positions?.pos_61_70 + google_positions?.pos_71_80 + google_positions?.pos_81_90 + google_positions?.pos_91_100

  const previous_pos_31_and_above = previous_google_positions?.pos_31_40 + previous_google_positions?.pos_41_50 + previous_google_positions?.pos_51_60 + previous_google_positions?.pos_61_70 + previous_google_positions?.pos_71_80 + previous_google_positions?.pos_81_90 + previous_google_positions?.pos_91_100

  //   const keywordDisDiff = {
  //     google: {
  //       "2-3": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_2_3, route?.google?.organic_positions.pos_2_3),
  //       "4-10": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_4_10, routePrevious?.google?.organic_positions?.pos_4_10),
  //       "11-20": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_11_20, routePrevious?.google?.organic_positions?.pos_11_20),
  //       "21-30": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_21_30, routePrevious?.google?.organic_positions?.pos_21_30),
  //       "Above 30": calculatePercentageDifference(previous_pos_31_and_above, pos_31_and_above),

  //     },
  //     bing: {
  // "2-3": calculatePercentageDifference(routePrevious?.bing?.organic_positions?.pos_2_3, route?.bing?.organic_positions.pos_2_3) ?? 0,
  //       "4-10": calculatePercentageDifference(routePrevious?.bing?.organic_positions?.pos_4_10, routePrevious?.bing?.organic_positions?.pos_4_10) ?? 0,
  //       "11-20": calculatePercentageDifference(routePrevious?.bing?.organic_positions?.pos_11_20, routePrevious?.bing?.organic_positions?.pos_11_20) ?? 0,
  //       "21-30": calculatePercentageDifference(routePrevious?.bing?.organic_positions?.pos_21_30, routePrevious?.bing?.organic_positions?.pos_21_30) ?? 0,
  //       "Above 30": calculatePercentageDifference(previous_pos_31_and_above, pos_31_and_above),
  //     }

  //   }

  // const keywordDisDiff = {
  //   google: {
  //     "2-3": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_2_3, route?.google?.organic_positions?.pos_2_3) ?? 0,
  //     "4-10": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_4_10, route?.google?.organic_positions?.pos_4_10) ?? 0,
  //     "11-20": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_11_20, route?.google?.organic_positions?.pos_11_20) ?? 0,
  //     "21-30": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_21_30, route?.google?.organic_positions?.pos_21_30) ?? 0,
  //     "Above 30": calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_31_and_above, route?.google?.organic_positions?.pos_31_and_above) ?? 0,
  //   },
  //   bing: {
  //     "2-3": calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_2_3 ?? 0, +route?.bing?.organic_positions?.pos_2_3 ?? 0) ?? 0,
  //     "4-10": calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_4_10 ?? 0, +route?.bing?.organic_positions?.pos_4_10 ?? 0) ?? 0,
  //     "11-20": calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_11_20 ?? 0, +route?.bing?.organic_positions?.pos_11_20 ?? 0) ?? 0,
  //     "21-30": calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_21_30 ?? 0, +route?.bing?.organic_positions?.pos_21_30 ?? 0) ?? 0,
  //     "Above 30": calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_31_and_above ?? 0, +route?.bing?.organic_positions?.pos_31_and_above ?? 0) ?? 0,
  //   }
  // }






  const previousRouteExists = routePrevious && routePrevious.google && routePrevious.bing;

  const keywordDisDiff = {
    google: {
      "2-3": previousRouteExists
        ? calculatePercentageDifference(routePrevious?.google.organic_positions?.pos_2_3, route?.google.organic_positions?.pos_2_3)
        : 0,
      "4-10": previousRouteExists
        ? calculatePercentageDifference(routePrevious?.google.organic_positions?.pos_4_10, route?.google.organic_positions?.pos_4_10)
        : 0,
      "11-20": previousRouteExists
        ? calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_11_20, route?.google?.organic_positions?.pos_11_20)
        : 0,
      "21-30": previousRouteExists
        ? calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_21_30, route?.google?.organic_positions?.pos_21_30)
        : 0,
      "Above 30": previousRouteExists
        ? calculatePercentageDifference(routePrevious?.google?.organic_positions?.pos_31_and_above, route?.google?.organic_positions?.pos_31_and_above)
        : 0,
    },
    bing: {
      "2-3": previousRouteExists
        ? calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_2_3, +route?.bing?.organic_positions?.pos_2_3)
        : 0,
      "4-10": previousRouteExists
        ? calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_4_10, +route?.bing?.organic_positions?.pos_4_10)
        : 0,
      "11-20": previousRouteExists
        ? calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_11_20, +route?.bing?.organic_positions?.pos_11_20)
        : 0,
      "21-30": previousRouteExists
        ? calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_21_30, +route?.bing?.organic_positions?.pos_21_30)
        : 0,
      "Above 30": previousRouteExists
        ? calculatePercentageDifference(+routePrevious?.bing?.organic_positions?.pos_31_and_above, +route?.bing.organic_positions?.pos_31_and_above)
        : 0,
    }
  }

  const dist_labels = OverviewData?.project?.crawlings.map((label: any) => moment(label.createdAt.replace(/^0+/, '')).format("MMM DD"));
  const gdist_data = OverviewData?.project?.crawlings?.map((item: any) => item?.crawlingData)
  // console.log("GL", gdist_data)

  const options = {
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            size: 12,
          },
          color: '#333',
          usePointStyle: true,
          backgroundColor: "#333",
          pointStyle: 'circle',
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Keywords',
        },
        ticks: {
          stepSize: 10,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
  };


  // const position = OverviewData?.project?.crawlings?.map((item: any) => {
  //   const crawlingData = item.crawlingData && item.crawlingData.find((data:any) => data.data);
  //   const bingData = crawlingData.data.bing.organic_positions;
  // const googleData = crawlingData.data.google.organic_positions;
  //   return {
  //     bing: {
  //       pos_2_3: bingData.pos_2_3,
  //       pos_4_10: bingData.pos_4_10,
  //       pos_11_20: bingData.pos_11_20,
  //       pos_21_30: bingData.pos_21_30,
  //       pos_31_40: bingData.pos_31_40,
  //       pos_41_50: bingData.pos_41_50,
  //       pos_51_60: bingData.pos_51_60,
  //       pos_61_70: bingData.pos_61_70,
  //       pos_71_80: bingData.pos_71_80,
  //       pos_81_90: bingData.pos_81_90,
  //       pos_91_100: bingData.pos_91_100,
  //     },
  //     google: {
  //       pos_2_3: googleData.pos_2_3,
  //       pos_4_10: googleData.pos_4_10,
  //       pos_11_20: googleData.pos_11_20,
  //       pos_21_30: googleData.pos_21_30,
  //       pos_31_40: googleData.pos_31_40,
  //       pos_41_50: googleData.pos_41_50,
  //       pos_51_60: googleData.pos_51_60,
  //       pos_61_70: googleData.pos_61_70,
  //       pos_71_80: googleData.pos_71_80,
  //       pos_81_90: googleData.pos_81_90,
  //       pos_91_100: googleData.pos_91_100,
  //     },
  //   }
  // })

  // console.log("POS",position?.bing?.pos_2_3)

  const data = {
    // changing labels to changes values on X-axis.
    labels: dist_labels,
    // each label must be unique name
    // add a new #color for backgroundColor, borderColor, pointBorderColor, pointHoverBackgroundColor properties for every new entry
    datasets: [
      {
        color: "#fff",
        label: "0 - 3",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#717BBC",
        borderColor: "#717BBC",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#2a2c30",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#2a2c30",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        // always the number of elements in the data array have to be equal to the number of elements in label.
        data: [0, 14, 21, 9, 35]
      },
      {
        color: "#000",
        label: "4 - 10",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#F97065",
        borderColor: "#F97065",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#F97065",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#f84c1e",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        data: [20, 39, 10, 11, 16, 2, 40]
      },
      {
        color: "#000",
        label: "11 - 50",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#36BFFA",
        borderColor: "#36BFFA",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#008000",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#008000",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        data: [10, 49, 15, 31, 26, 21, 50]
      },
      {
        color: "#000",
        label: "51 - 100",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#F670C7",
        borderColor: "#F670C7",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#F670C7",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#F670C7",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        data: [10, 49, 15, 31, 26, 21, 50]
      },
      {
        color: "#000",
        label: "100+",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#39D583",
        borderColor: "#39D583",
        borderCapStyle: "round",
        borderJoinStyle: "round",
        pointBorderColor: "#39D583",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#39D583",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 5,
        pointRadius: 0,
        pointHitRadius: 5,
        data: [10, 49, 15, 31, 26, 21, 50]
      }
    ]
  };

  console.log("KEY", route?.bing?.organic_positions?.pos_2_3)

  return (

    isPending ? <div className=""> Loading...</div>
      :
      (
        <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto">
          <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            <OrganicTrafficCard />
            <Card
              isLoading={isPending}
              isError={isError}
              title={"Featured Snippet"}
              amount={se == "google" ? google_featured_snippet : bing_featured_snippet}
              style={se === "google" ? (
                gfs_percentage === 0 ? "text-gray-500"
                  : gfs_percentage > 0 ? "text-green-500" : "text-red-500"
              ) :
                (
                  bfs_percentage === 0 ? "text-gray-500"
                    : bfs_percentage > 0 ? "text-green-500" : "text-red-500"
                )
              }
              percent={se === "google" ? gfs_percentage : bfs_percentage}
              chart={<LineChart pageData={se === "google" ? getGoogleTrafficLineGraphData() : getBingTrafficLineGraphData()} />}
            />
            <Card
              title={"New Ranking Element"}
              amount={se === "google" ? google_new_ranking : bing_new_ranking}
              style={se == "google" ?
                (google_new_ranking_perc === 0 ? "text-gray-500"
                  : google_new_ranking_perc > 0 ? "text-green-500" : "text-red-500"
                )
                :
                (
                  bing_new_ranking_perc === 0 ? "text-gray-500"
                    : bing_new_ranking_perc > 0 ? "text-green-500" : "text-red-500"
                )
              }
              percent={se === "google" ? google_new_ranking_perc : bing_new_ranking_perc}
              chart={<LineChart pageData={se === "google" ? getGoogleNewRankingGraphData() : getBingNewRankingGraphData()} />}
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
                      <td className=" p-2 ">{(google_positions?.pos_2_3)?.toFixed(1) ?? 0} </td>
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
                      `} />{keywordDisDiff.google["2-3"]?.toFixed(2) ?? 0} </span>


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
                      `} />{keywordDisDiff.google["4-10"]?.toFixed(2) ?? 0} </span>


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
                      `} />{keywordDisDiff.google["11-20"]?.toFixed(2) ?? 0} </span>


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
                      `} />{keywordDisDiff.google["21-30"]?.toFixed(2) ?? 0} </span>


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
                      `} />{keywordDisDiff.google["Above 30"]?.toFixed(2) ?? 0} </span>
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
              {/* <BarChartSingle
            labels={["23","33", "90","33"]}
            data={[23,50,10,33,10]}
            xAxisLabel="Month"
            yAxisLabel="Number of Keywords"
          /> */}
              <Line data={data as ChartData<"line", number[], string>} options={options as ChartOptions<"line">} />
            </div>
          </section>
        </main>
      )
  );
}
