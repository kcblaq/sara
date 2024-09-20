import React from "react";
import { TitleWithoutUnderline } from "../../technical-seo/components/Overview";
import PieChart from "./PieChart";
import { GoDotFill } from "react-icons/go";
import { connotation } from "../data/connotationData";

export default function Overview() {
  return (
    <section className="grid grid-cols-3 gap-10 mb-10 overflow-y-auto">
      {/* first grid */}
      <div className="flex flex-col gap-6 h-[480px] ">
        <div className="border rounded-md px-4 space-y-8 h-[152px]">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Aggregate rank"}
              info={"Aggregate rank"}
            />
          </div>

          <h1 className="text-4xl font-bold">344</h1>
        </div>

        <div className="border rounded-md px-4 space-y-8 h-full">
          <div className="mt-6">
            <TitleWithoutUnderline
              title={"Connotation types"}
              info={"Connotation types"}
            />

            <div className="flex h-[200px] mt-6 gap-2">
              <PieChart dataSet={connotation} />{" "}
              <div className="flex flex-col justify-end">
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
              </div>
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

        <div className="h-[280px]"></div>
      </div>
      <div className="bg-yellow-400 h-[480px]"></div>
    </section>
  );
}
