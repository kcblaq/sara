import { mockedData } from "@/app/component/data/mockedData";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { CiImageOn, CiSearch } from "react-icons/ci";
import { FaLink, FaVideo } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoCartOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdArrowUpward } from "react-icons/md";
import { DetailButton } from "./KeywordAnalysis";

const tabsFilter = [
  { name: "All keywords" },
  { name: "Related terms" },
  { name: "Matching phrase" },
  { name: "Matching terms" },
  { name: "Questions" },
];

export function SelectorDropdown({
  items,
  icon,
  selected,
  setSelected,
}: {
  items: any[];
  icon?: React.ReactNode;
  selected: string;
  setSelected: () => void;
}) {
  return (
    <Menu as="div" className="  relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        {selected}

        <IoChevronDownOutline
          className="-mr-1 ml-2 h-5 w-5 text-black"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <span className="px-1 py-1 ">
            {items.map((prop) => {
              return (
                <Menu.Item key={prop}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={setSelected}
                    >
                      {prop}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </span>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function SmartKeywordFinder() {
  const [keyword, setKeyword] = useState("");
  const [keywordCategory, setKeywordCategory] = useState("All keywords");
  const [selected, setSelected] = useState("Volume");

  return (
    <main className="py-10 grid gap-8 w-full">
      <section className="flex min-[500px]:flex-row flex-col min-[500px]:items-center min-[500px]:gap-0 gap-2 min-[500px]:justify-between w-full">
        <h1 className=" text-2xl text-black font-semibold">
          Keyword: <span className=" font-normal">{keyword} </span>
        </h1>
        <div className="flex relative rounded-md sm:w-[320px] w-full">
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 "
          />
          <CiSearch className=" absolute top-4 left-4 " />
        </div>
      </section>
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {tabsFilter.map((item, index) => (
            <button
              key={index}
              title={item.name}
              className={`flex items-center border shadow rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${
                keywordCategory === item.name
                  ? "bg-[#EFF8FF] border-none "
                  : "bg-[#FFF]"
              }`}
              onClick={() => setKeywordCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <SelectorDropdown
            items={["Volume", "Quantity", "Awareness"]}
            selected={selected}
            setSelected={() => setSelected}
          />
          <SelectorDropdown
            items={["KD", "Quantity", "Awareness"]}
            selected={"KD"}
            setSelected={() => setSelected}
          />
          <SelectorDropdown
            items={["KD", "Quantity", "Awareness"]}
            selected={"SERP features"}
            setSelected={() => setSelected}
          />
        </div>
      </section>
      <section className=" rounded-md w-full border shadow-sm p-6">
        <div className="flex items-center gap-3">
          <p className="text-[#101828] font-medium text-lg ">1,2000 keywords</p>
          <p className="text-[#344054] font-medium text-xs px-3 p-2 rounded-2xl bg-[#F2F4F7] ">
            6.7M total volume{" "}
          </p>
        </div>
        <table className="w-full">
          <thead className="bg-[#F9FAFB] w-full">
            <tr className=" h-[44px] text-xs text-[#475467]  font-medium">
              <th>
                {" "}
                <span className="flex items-center gap-2 p-2">
                  {" "}
                  <input type="checkbox" className="" /> Keywords{" "}
                </span>
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  Volume <MdArrowUpward />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  GV <DetailButton title={""} />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  KD <DetailButton title={""} />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  TF <DetailButton title={""} />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  CPC <DetailButton title={""} />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  SERP features <DetailButton title={""} />{" "}
                </span>{" "}
              </th>
              <th>
                {" "}
                <span className="flex items-center gap-1 p-2">
                  {" "}
                  Update
                </span>{" "}
              </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {mockedData.map((data) => {
              return (
                <tr className=" border-b">
                  <td className=" p-2  ">
                    <span className="flex items-center gap-2 ">
                      {" "}
                      <input type="checkbox" className="" /> {data.keyword}{" "}
                    </span>
                  </td>

                  <td className="rounded-full">
                    <span className={``}>{data.volume} </span>{" "}
                  </td>
                  <td className="rounded-full">
                    <span className={``}>{data.gv} </span>{" "}
                  </td>
                  <td className="  p-2  rounded-full">
                    <span
                      className={`p-1 w-2/3 rounded-3xl text-center flex items-center justify-center ${
                        data.kd > 39
                          ? "bg-[#F6FEF9] text-[#12B76A]"
                          : "bg-[#FFFAEB] text-[#B54708] "
                      }`}
                    >
                      {" "}
                      <GoDotFill />
                      {data.kd}{" "}
                    </span>{" "}
                  </td>
                  <td className="rounded-full">
                    <span className={``}>{data.tf}</span>{" "}
                  </td>
                  <td className="rounded-full">
                    <span className={``}>{data.cpc}</span>{" "}
                  </td>
                  <td className="rounded-full">
                    <span className={`flex items-center gap-2 text-sm`}>
                      {data.serp.includes("link") && <FaLink />}
                      {data.serp.includes("image") && <CiImageOn />}
                      {data.serp.includes("shop") && <IoCartOutline />}
                      {data.serp.includes("video") && <FaVideo />}
                    </span>{" "}
                  </td>
                  <td className="rounded-full">
                    <span className={``}> 2 weeks ago</span>{" "}
                  </td>
                  <td className=" ">
                    <span
                      className={`  border flex p-3 items-center justify-center rounded-lg cursor-pointer text-primary `}
                    >
                      {" "}
                      <FiRefreshCw />
                    </span>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
