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

export default function RankOverview() {
  const traffic = useSelector((state: RootState) => state.performance.metrics);
  const activeUrl = useSelector(
    (state: RootState) => state.property.activeProperty
  );

  // const {data,isError, isLoading } = useQuery({
  //     queryKey: ['ranking-overview'],
  //     queryFn: ()=> {
  //         ApiCall.get('/crawl/rank/mini-crawler', {
  //             params:{
  //                 url:activeUrl
  //             }
  //         })
  //     }
  // })

  // useEffect(()=> {
  //   async  function getData(){
  //     await ApiCall.get('/crawl/rank/mini-crawler', {
  //         params:{
  //             url: activeUrl
  //         }
  //     })
  //   }
  //   getData()
  // })
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto ">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrganicTrafficCard />
        <Card
          title={"Search visibility"}
          amount={undefined}
          style={""}
          percent={undefined}
          chart={undefined}
        />
        <Card
          title={"Average position"}
          amount={undefined}
          style={""}
          percent={undefined}
          chart={undefined}
        />
      </section>
      <section className="grid grid-cols-3 gap-8 ">
        <div
          className={` col-span-1 grid p-6 gap-3 rounded-md border shadow-sm w-full`}
        >
          <TitleWithoutUnderline
            title={"Keyword ranking "}
            info={"Keyword ranking "}
          />
          <div className="w-full rounded-xl border shadow-sm content-start justify-between ">
            <table className="py-4 w-full">
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
                  <td className=" p-2 ">0 - 3</td>
                  <td className=" p-2 ">517</td>
                  <td className="  p-2 rounded-full">
                    <span className={`bg-green-200 p-2 rounded-full`}>60</span>{" "}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className=" p-2 ">0 - 3</td>
                  <td className=" p-2 ">517</td>
                  <td className="  p-2 rounded-full">
                    <span className={`bg-green-200 p-2 rounded-full`}>60</span>{" "}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="w-1/3 p-2 ">0 - 3</td>
                  <td className="w-1/3 p-2 ">517</td>
                  <td className="  p-2 rounded-full">
                    <span className={`bg-green-200 p-2 rounded-full`}>60</span>{" "}
                  </td>
                </tr>
                <tr className="">
                  <td className="w-1/3 p-2 ">0 - 3</td>
                  <td className="w-1/3 p-2 ">517</td>
                  <td className="  p-2 rounded-full">
                    <span className={`bg-green-200 p-2 rounded-full`}>60</span>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={` col-span-2 grid p-6 gap-3 rounded-md border shadow-sm w-full`}
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
