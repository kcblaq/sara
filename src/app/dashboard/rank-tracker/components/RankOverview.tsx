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
import { ShortenNumber } from "@/app/utils/ShortenedNumber";


interface Props {
  se: string,
  type: { name: string, value: string }
}
export default function RankOverview({ se, type }: Props) {


  const [isClient, setIsClient] = useState(false);


  const { isError, isPending, isSuccess, data: OverviewData } = useRankTrackingOverview("overview");

  const specificroute = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data?.[se]
  const prevspecificroute = OverviewData?.project?.crawlings[1]?.crawlingData[0]?.data?.[se]

  function getTrafficData() {
    const googleTrafficVolumeData = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && googleTrafficVolumeData.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && googleTrafficVolumeData.length < 5; j++) {
        const googleTraffic = crawlingData[j]?.data?.[se]?.[type.value]?.etv;
        if (googleTraffic !== undefined) {
          googleTrafficVolumeData.push(googleTraffic);
        }
      }
    }

    return googleTrafficVolumeData;
  }



  function getFeaturedSnippetData() {
    const featuredSnippet = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && featuredSnippet.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && featuredSnippet.length < 5; j++) {
        const googleTraffic = crawlingData[j]?.data?.[se]?.featured_snippet;
        if (googleTraffic !== undefined) {
          featuredSnippet.push(googleTraffic);
        }
      }
    }

    return featuredSnippet;
  }
  function getNewrankingData() {
    const newRankingData = [];
    const crawlings = OverviewData?.project?.crawlings || [];

    for (let i = 0; i < crawlings.length && newRankingData.length < 5; i++) {
      const crawlingData = crawlings[i]?.crawlingData || [];
      for (let j = 0; j < crawlingData.length && newRankingData.length < 5; j++) {
        const newRanking = crawlingData[j]?.data?.[se]?.new_ranking_elements;
        if (newRanking !== undefined) {
          newRankingData.push(newRanking);
        }
      }
    }

    return newRankingData;
  }

  const positionRoute = specificroute?.[type.value]

  const positions = {
    "2 - 3": positionRoute?.["pos_2_3"],
    "4 - 10": positionRoute?.["pos_4_10"],
    "11 - 20": positionRoute?.["pos_11_20"],
    "21 - 30": positionRoute?.["pos_21_30"],
    "31 - 40": positionRoute?.["pos_31_40"],
    "41 - 50": positionRoute?.["pos_41_50"],
    "51 - 60": positionRoute?.["pos_51_60"],
    "61 - 70": positionRoute?.["pos_61_70"],
    "71 - 80": positionRoute?.["pos_71_80"],
    "81 - 90": positionRoute?.["pos_81_90"],
    "91 - 100": positionRoute?.["pos_91_100"],
    "41 above": [
      positionRoute?.["pos_41_50"],
      positionRoute?.["pos_51_60"],
      positionRoute?.["pos_61_70"],
      positionRoute?.["pos_71_80"],
      positionRoute?.["pos_81_90"],
      positionRoute?.["pos_91_100"],
    ].reduce((sum, value) => sum + (value ?? 0), 0),
  }

  const positionPrevious = prevspecificroute?.[type.value];
  const positionDifference = {
    "2 - 3": (positionPrevious?.["pos_2_3"] === undefined ? 0 : positionRoute?.["pos_2_3"] - positionPrevious?.["pos_2_3"]),
    "4 - 10": (positionPrevious?.["pos_4_10"] === undefined ? 0 : positionRoute?.["pos_4_10"] - positionPrevious?.["pos_4_10"]),
    "11 - 20": (positionPrevious?.["pos_11_20"] === undefined ? 0 : positionRoute?.["pos_11_20"] - positionPrevious?.["pos_11_20"]),
    "21 - 30": (positionPrevious?.["pos_21_30"] === undefined ? 0 : positionRoute?.["pos_21_30"] - positionPrevious?.["pos_21_30"]),
    "31 - 40": (positionPrevious?.["pos_31_40"] === undefined ? 0 : positionRoute?.["pos_31_40"] - positionPrevious?.["pos_31_40"]),
    "41 - 50": (positionPrevious?.["pos_31_40"] === undefined ? 0 : positionRoute?.["pos_41_50"] - positionPrevious?.["pos_41_50"]),
    "51 - 60": (positionPrevious?.["pos_41_50"] === undefined ? 0 : positionRoute?.["pos_51_60"] - positionPrevious?.["pos_51_60"]),
    "61 - 70": (positionPrevious?.["pos_51_60"] === undefined ? 0 : positionRoute?.["pos_61_70"] - positionPrevious?.["pos_61_70"]),
    "71 - 80": (positionPrevious?.["pos_71_80"] === undefined ? 0 : positionRoute?.["pos_71_80"] - positionPrevious?.["pos_71_80"]),
    "81 - 90": (positionPrevious?.["pos_81_90"] === undefined ? 0 : positionRoute?.["pos_81_90"] - positionPrevious?.["pos_81_90"]),
    "91 - 100": (positionPrevious?.["91 - 100"] === undefined ? 0 : positionRoute?.["pos_91_100"] - positionPrevious?.["pos_91_100"]),
    "41 above": [
      ( positionPrevious?.["pos_41_50"] === undefined ? 0 : positionRoute?.["pos_41_50"] - positionPrevious?.["pos_41_50"]),
      ( positionPrevious?.["pos_51_60"] === undefined ? 0 : positionRoute?.["pos_51_60"] - positionPrevious?.["pos_51_60"]),
      ( positionPrevious?.["pos_61_70"] === undefined ? 0 : positionRoute?.["pos_61_70"] - positionPrevious?.["pos_61_70"]),
      ( positionPrevious?.["pos_71_80"] === undefined ? 0 : positionRoute?.["pos_71_80"] - positionPrevious?.["pos_71_80"]),
      ( positionPrevious?.["pos_81_90"] === undefined ? 0 : positionRoute?.["pos_81_90"] - positionPrevious?.["pos_81_90"]),
      ( positionPrevious?.["pos_91_100"] === undefined ? 0 : positionRoute?.["pos_91_100"] - positionPrevious?.["pos_91_100"])
    ].reduce((sum, value) => sum + (value ?? 0), 0),
  }


  const getClass = (value: number) => {
    return value > 0 ? "bg-green-200" : value < 0 ? "bg-red-400" : "bg-gray-200";
  };
  const arrowStyle = (value: number) => {
    return value > 0 ? "text-green-500" : value < 0 ? "text-red-400 rotate-180" : "";
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }



  const dist_labels = OverviewData?.project?.crawlings.map((label: any) => moment(label.createdAt.replace(/^0+/, '')).format("MMM DD"));



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
              amount={ShortenNumber(specificroute?.featured_snippet?.toFixed(2)) ?? 0}
              style={
                prevspecificroute?.featured_snippet === 0 || prevspecificroute?.featured_snippet == undefined ? "text-gray-500"
                  : prevspecificroute?.featured_snippet ?? 0 === specificroute?.featured_snippet ? "text-gray-500"
                    : specificroute?.featured_snippet > prevspecificroute?.featured_snippet ?? 0 ? "text-green-500" : "text-red-500"
              }
              // percent={se === "google" ? gfs_percentage : bfs_percentage}
              percent={calculatePercentageDifference(prevspecificroute?.featured_snippet ?? 0, specificroute?.featured_snippet ?? 0)}
              chart={<LineChart pageData={getFeaturedSnippetData()} />}
            />
            <Card
              title={"New Ranking Element"}
              // amount={se === "google" ? google_new_ranking : bing_new_ranking}
              amount={ShortenNumber(specificroute?.new_ranking_elements?.toFixed(2))}
              style={
                prevspecificroute?.new_ranking_elements === 0 || prevspecificroute?.new_ranking_elements == undefined ? "text-gray-500"
                  : prevspecificroute?.new_ranking_elements ?? 0 === specificroute?.new_ranking_elements ? "text-gray-500"
                    : specificroute?.new_ranking_elements > prevspecificroute?.new_ranking_elements ?? 0 ? "text-green-500"
                      : "text-red-500"
              }
              percent={calculatePercentageDifference(prevspecificroute?.new_ranking_elements, prevspecificroute?.new_ranking_elements)}
              chart={<LineChart pageData={getNewrankingData()} />}
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
                      <td className=" p-2 ">{(positions["2 - 3"])?.toFixed(2) ?? 0} </td>
                      <td className="  p-2 rounded-full">


                        <span className={`p-2 rounded-full flex items-center gap-1
                      ${getClass(positionDifference?.["2 - 3"])
                          }
                      `}><FaArrowUp className={`
                        ${arrowStyle(positionDifference?.["2 - 3"])
                            }
                      `} />{positionDifference?.["2 - 3"]?.toFixed(2)} </span>


                      </td>
                    </tr>
                    <tr className=" border-b">
                      <td className=" p-2 ">4 - 10</td>
                      <td className=" p-2 ">{(positions["4 - 10"])?.toFixed(2) ?? 0} </td>
                      <td className="  p-2 rounded-full">


                        <span className={`p-2 rounded-full flex items-center gap-1
                      ${getClass(positionDifference?.["4 - 10"])
                          }
                      `}><FaArrowUp className={`
                        ${arrowStyle(positionDifference?.["4 - 10"])
                            }
                      `} />{positionDifference?.["4 - 10"]?.toFixed(2)} </span>


                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="w-1/3 p-2 ">11 - 20</td>
                      <td className="w-1/3 p-2 "> {positions["11 - 20"]?.toFixed(2)} </td>
                      <td className="  p-2 rounded-full">


                        <span className={`p-2 rounded-full flex items-center gap-1
                      ${getClass(positionDifference?.["11 - 20"])
                          }
                      `}><FaArrowUp className={`
                        ${arrowStyle(positionDifference?.["4 - 10"])
                            }
                      `} />{positionDifference?.["11 - 20"]?.toFixed(2) ?? 0} </span>


                      </td>
                    </tr>
                    <tr className="">
                      <td className="w-1/3 p-2 ">21 - 30</td>
                      <td className="w-1/3 p-2 ">{positions["21 - 30"]?.toFixed(2)} </td>
                      <td className="  p-2 rounded-full">



                        <span className={`p-2 rounded-full flex items-center gap-1
                      ${getClass(positionDifference?.["21 - 30"])
                          }
                      `}><FaArrowUp className={`
                        ${arrowStyle(positionDifference?.["21 - 30"])
                            }
                      `} />{positionDifference?.["21 - 30"]?.toFixed(2) ?? 0} </span>


                      </td>
                    </tr>
                    <tr className="">
                      <td className="w-1/3 p-2 ">Above 41</td>
                      <td className="w-1/3 p-2 "> {positions["41 above"]} </td>
                      <td className="  p-2 rounded-full">
                        <span className={`p-2 rounded-full flex items-center gap-1
                      ${getClass(positionDifference?.["41 above"])
                          }
                      `}><FaArrowUp className={`
                        ${arrowStyle(positionDifference?.["41 above"])
                            }
                      `} />{positionDifference?.["41 above"]?.toFixed(2) ?? 0} </span>
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
              <Line data={data as ChartData<"line", number[], string>} options={options as ChartOptions<"line">} />
            </div>
          </section>
        </main>
      )
  );
}
