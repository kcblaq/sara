import { TitleWithoutUnderline } from "@/app/dashboard/technical-seo/components/Overview";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { ReusableDoughnutGraph } from "./ReusableDoughnutGraph";

export default function BacklinkType() {
  return (
    <section className="flex flex-col gap-4 border shadow-sm rounded-md p-4 py-6">
      <TitleWithoutUnderline title={"Backlink type"} info={"Backlink type"} />
      <div className="p-4 flex xl:flex-row lg:flex-col gap-2 ">
        <ReusableDoughnutGraph
          data={{
            labels: ["Jan", "Feb"],
            datasets: [
              {
                data: [10, 20, 30, 10],
                backgroundColor: ["#1849A9", "#53B1FD", "#FECDCA", "#A6F4C5"],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 0,
              },
            ],
          }}
        />
        <div className="flex flex-col justify-end">
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-[#1849A9]">
              <GoDotFill />{" "}
            </span>
            {` Text - (32.8k) `}{" "}
          </p>
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-[#53B1FD]">
              <GoDotFill />{" "}
            </span>{" "}
            {`Image - (23.9k) `}{" "}
          </p>
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-[#FECDCA]">
              <GoDotFill />{" "}
            </span>{" "}
            {`Form - (23.9k) `}{" "}
          </p>
          <p className=" text-xs flex items-center text-[#475467]">
            {" "}
            <span className="text-[#A6F4C5]">
              <GoDotFill />{" "}
            </span>{" "}
            {`Frame - (23.9k) `}{" "}
          </p>
        </div>
        <div className=" col-span-2"></div>
      </div>
    </section>
  );
}
