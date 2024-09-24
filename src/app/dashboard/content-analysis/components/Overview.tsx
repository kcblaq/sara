import React from "react";
import { TitleWithoutUnderline } from "../../technical-seo/components/Overview";
import PieChart from "./PieChart";
import { GoDotFill } from "react-icons/go";
import { connotation } from "../data/connotationData";
import DoughnutChartWithBottomLegend from "./DoughnutChartWithBottomLegend";
import { sentimentDataset } from "../data/sentmentData";

export default function Overview() {
  return (
    <section className="grid grid-cols-3 gap-10 mb-10 overflow-y-auto">
      {/* first grid */}
      <div className="flex flex-col gap-6 h-[480px] ">
        <div className="border rounded-md px-4">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Aggregate rank"}
              info={"Aggregate rank"}
            />
          </div>

          <h1 className="text-4xl font-bold my-8">344</h1>
        </div>

        <div className="border rounded-md px-4 space-y-8 h-full">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Connotation types"}
              info={"Connotation types"}
            />

            <div className="flex h-[200px] w-full mt-6 gap-2">
              <PieChart dataSet={connotation} />{" "}
              {/* <div className="flex flex-col justify-end">
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-green-500" />
                  Positive (44%)
                </p>
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-yellow-500" /> Neutral (44%)
                </p>
                <p className="inline-flex gap-1 items-center whitespace-nowrap">
                  <GoDotFill className="text-red-500" /> Negative (44%)
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* second grid */}
      <div className="border rounded-md h-[480px] px-4">
        <div className="mt-6">
          <TitleWithoutUnderline
            title={"Sentiment connotations"}
            info={"Sentiment connotations"}
          />
        </div>

        {/* <div className="h-full bg-red-400"> */}
        <DoughnutChartWithBottomLegend items={sentimentDataset} />
        {/* </div> */}
      </div>
      {/* third grid */}
      <div className=" h-[480px] border rounded-md px-4">
        <div className="mt-6">
          <TitleWithoutUnderline title={"Top domains"} info={"Top domains"} />
        </div>
        <hr className="mt-4" />
        <div className="overflow-x-auto max-w-full mt-4">
          <table className="border rounded-lg border-separate border-spacing-0">
            <tr className="bg-[#F9FAFB] border-b">
              <th className="w-full  text-left p-3">Domain</th>
              <th className="w-full  text-left p-3">Mentions</th>
            </tr>
            <tr className="border-b">
              <td className="w-full  text-left p-3">nike.com</td>
              <td className="w-full  text-left p-3">7.10k</td>
            </tr>
            <tr className="border-b">
              <td className="w-full  text-left p-3">businessbranding.com</td>
              <td className="w-full  text-left p-3">16.7K</td>
            </tr>
            <tr className="border-b">
              <td className="w-full  text-left p-3">businessbranding.com</td>
              <td className="w-full  text-left p-3">16.7K</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  );
}
