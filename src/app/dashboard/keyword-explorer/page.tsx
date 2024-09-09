"use client";
import { AiOutlineFileAdd } from "react-icons/ai";
import CountryPick from "../rank-tracker/components/CountryPick";
import { CiSettings } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import ToggleMobile from "../components/ToggleMobile";
import { useState } from "react";
import SearchEnginePick from "../rank-tracker/components/SearchEnginePick";
import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import PlainButton from "@/app/component/PlainButton";
import FilledButton from "@/app/component/FilledButton";
import KeywordAnalysis from "./component/KeywordAnalysis";
import SmartKeywordFinder from "./component/SmartKeywordFinder";

const tabs = [
  // { title: "Keyword analysis", content: <KeywordAnalysis /> },
  { title: "Smart keyword finder", content: <SmartKeywordFinder /> },
  // { title: "Keyword list", content: <KeywordList /> }
];

export default function page() {
  const [mobile, setMobile] = useState(false);
  const [stage, setStage] = useState(1);
  return stage == 0 ? (
    <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto">
      <section className={`flex flex-col gap-4 text-[#101828] `}>
        <h1 className={`font-semibold text-4xl 2xl:text-5xl`}>
          {" "}
          Keyword explorer
        </h1>
        <p className={`text-lg 2xl:text-xl`}>
          {" "}
          Explore thousands of keywords and research smart keyword suggestions
        </p>
      </section>
      <section className="flex items-start gap-8 justify-between">
        <div className="flex flex-col gap-2 ">
          <label className=" font-medium " htmlFor="keyword">
            Enter keywords separated by commas
          </label>
          <textarea
            rows={5}
            cols={70}
            placeholder="e.g. dog food, pet care, how to care for your dog..."
            className=" p-2 border rounded-md "
          ></textarea>
          <div className="flex justify-end items-center gap-6">
            <button className=" border flex items-center gap-2 rounded-md font-semibold p-2 px-3 ">
              Clear all
            </button>
            <button className=" bg-[#EFF8FF] border text-[#175CD3] flex items-center gap-2 rounded-md font-semibold p-2 px-3 ">
              <AiOutlineFileAdd />
              Import file
            </button>
          </div>
        </div>
        <div className={`flex items-center gap-6 mt-8`}>
          <CountryPick />
          <FilledButton title="Search Keywords" />
        </div>
      </section>
      <div className="flex items-center justify-center">
        <h1 className={`text-[#101828] font-semibold text-4xl my-10 `}> OR </h1>
      </div>
      <section className="flex items-start gap-8 justify-between">
        <div className="flex flex-col gap-2 ">
          <label className=" font-medium " htmlFor="keyword">
            Enter base keyword and get smart keyword suggestions{" "}
          </label>
          <textarea
            rows={2}
            cols={70}
            placeholder="e.g. dog food, pet care, how to care for your dog..."
            className=" p-2 border rounded-md "
          ></textarea>
        </div>
        <div className={`flex items-center gap-6 mt-8`}>
          <CountryPick />
          <FilledButton title="Search Keywords" />
        </div>
      </section>
    </main>
  ) : stage == 1 ? (
    <main className="grid w-full h-full items-start content-start gap-6  mb-20 overflow-auto">
      <section
        className={`flex sm:flex-row flex-col sm:justify-between w-full sm:items-center gap-4 text-[#101828]`}
      >
        <h1 className={`font-semibold text-3xl  whitespace-nowrap `}>
          {" "}
          Keyword explorer
        </h1>
        <div className="flex w-full md:w-1/2 sm:items-center sm:justify-end gap-2 md:gap-4">
          <span className="">
            <button className="rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500">
              Update data
            </button>
          </span>
          <span className="">
            <PlainButton
              moreClass="text-primary bg-[#EFF8FF]"
              title="Share"
              icon={<IoCloudUploadOutline />}
            />
          </span>
          <span className="p-3 rounded-md border cursor-pointer ">
            <CiSettings />
          </span>
        </div>
      </section>
      <section
        className={`flex sm:flex-row flex-col w-full sm:items-center items-start gap-4 text-[#101828] `}
      >
        <ToggleMobile
          mobile={mobile}
          setMobile={setMobile}
          className="sm:w-auto w-fit font-normal"
        />
        <CountryPick className="sm:w-auto w-fit" />
        <SearchEnginePick className="sm:w-auto w-fit" />
      </section>
      <section className={``}>
        <Tab.Group>
          <Tab.List className="flex gap-4 w-full">
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
          </Tab.List>
          <hr className="w-full" />
          <span className={` h-full w-full overflow-auto  `}>
            <Tab.Panels>
              {tabs.map((tab) => {
                return (
                  <div key={tab.title} className="h-full ">
                    <Tab.Panel>{tab.content}</Tab.Panel>
                  </div>
                );
              })}
            </Tab.Panels>
          </span>
        </Tab.Group>
      </section>
    </main>
  ) : (
    <span className="">Detail</span>
  );
}
