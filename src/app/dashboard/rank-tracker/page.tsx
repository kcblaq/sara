"use client";

import FilledButton from "@/app/component/FilledButton";
import PlainButton from "@/app/component/PlainButton";
import React, { Fragment, useState } from "react";
import { IoCloudUploadOutline, IoSettingsOutline } from "react-icons/io5";
import ToggleMobile from "../components/ToggleMobile";
import CountryPick from "@/app/dashboard/rank-tracker/components/CountryPick";
import SearchEnginePick from "@/app/dashboard/rank-tracker/components/SearchEnginePick";
import OrganicPick from "./components/OrganicPick";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import RankOverview from "./components/RankOverview";
import Rankings from "./components/Rankings";
import { useQuery } from "@tanstack/react-query";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";
// import PageDistributions from './components/PageDistributions'

const tabs = [
  { title: "Overview", content: <RankOverview /> },
  { title: "Rankings", content: <Rankings /> },
  // { title: "Page distributions", content: <PageDistributions /> }
];
export default function page() {
  const [mobile, setMobile] = useState(false);
  const lastUpdated = useSelector(
    (state: RootState) =>
      state.performance.metrics?.history?.scores[0]?.createdAt
  );
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );

  // console.log(activeProperty);
  const { data } = useQuery({
    queryKey: ["rank"],
    queryFn: async () =>
      await ApiCall.get("/crawl/rank-tracker", {
        params: {
          url: activeProperty,
          se: "Google",
        },
      }),
  });
  // console.log("RANK",data)
  return (
    <main className="grid w-full h-full items-start content-start gap-6">
      <section
        className={`flex sm:flex-row flex-col sm:items-center w-full gap-2 justify-between`}
      >
        <div className=" whitespace-nowrap">
          <h3 className="text-[#101828] text-2xl font-semibold">
            Rank tracker
          </h3>
        </div>
        <div className="flex items-center gap-4 w-full sm:justify-end">
          <div className="">
            <FilledButton
              title={"Re-track rankings"}
              className="sm:text-base text-sm min-[375px]:px-5 px-px  min-[375px]:h-full h-9"
            />
          </div>
          <div>
            {" "}
            <button
              className={`w-full bg-[#EFF8FF] text-primary gap-2  items-center flex justify-center border min-[375px]:h-[40px] h-9  rounded-lg sm:text-base text-sm p-2 font-semibold hover:bg-gray-100 `}
            >
              <IoCloudUploadOutline /> Export
            </button>
          </div>
          <div className="">
            {" "}
            <PlainButton
              title={""}
              icon={<IoSettingsOutline />}
              className="sm:text-base text-sm min-[375px]:h-full h-9"
            />
          </div>
        </div>
      </section>

      <section className="w-full gap-6 flex lg:flex-row flex-col lg:items-center ">
        <div className="flex min-[375px]:flex-row flex-col min-[375px]:items-center min-[375px]:gap-4 gap">
          <p className="min-[425px]:text-inherit text-sm whitespace-nowrap">
            <strong> Last Update:</strong>{" "}
            {moment(lastUpdated).format("Do MMM YY")}{" "}
          </p>
          <ToggleMobile
            mobile={mobile}
            setMobile={setMobile}
            className="min-[425px]:text-inherit text-sm"
          />
        </div>
        <div className="flex sm:flex-row flex-col  w-full sm:gap-6 gap-2 sm:items-center it">
          <CountryPick className=" w-full flex items-center" />
          <SearchEnginePick className=" w-full flex items-center" />
          <OrganicPick className=" w-full flex items-center" />
        </div>
      </section>
      <section className={``}>
        <TabGroup>
          <TabList className="flex gap-4 w-full">
            {tabs.map((tab) => {
              return (
                <span key={tab.title}>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <p
                        className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${
                          selected
                            ? "text-primary border-b-2 border-primary"
                            : " text-[#667085] active:border-none"
                        }`}
                      >
                        {tab.title}
                      </p>
                    )}
                  </Tab>
                </span>
              );
            })}
          </TabList>
          <hr className="w-full" />
          <div className={` h-full w-full overflow-auto  `}>
            <TabPanels>
              {tabs.map((tab) => {
                return (
                  <span key={tab.title} className="h-full ">
                    <TabPanel>{tab.content}</TabPanel>
                  </span>
                );
              })}
            </TabPanels>
          </div>
        </TabGroup>
      </section>
    </main>
  );
}
