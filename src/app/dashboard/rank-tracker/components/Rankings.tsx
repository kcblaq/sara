import PlainButton from "@/app/component/PlainButton";
import React from "react";
import { CiImageOn } from "react-icons/ci";
import {
  FaArrowDown,
  FaArrowUp,
  FaLink,
  FaPlus,
  FaVideo,
} from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";

const mocked = [
  {
    keyword: "When we price goods",
    position: 20,
    increase: true,
    volume: 40,
    serp: ["link", "image", "shop"],
    kd: 20,
    traffic: 35,
    url: "www.ogene.com",
  },
  {
    keyword: "When we price goods",
    position: 30,
    increase: true,
    volume: 30,
    serp: ["link", "video", "shop"],
    kd: 20,
    traffic: 35,
    url: "www.ogene.com",
  },
  {
    keyword: "When we price goods",
    position: 34,
    increase: true,
    volume: 28,
    serp: ["location", "image", "shop"],
    kd: 20,
    traffic: 35,
    url: "www.ogene.com",
  },
  {
    keyword: "When we price goods",
    position: 43,
    increase: true,
    volume: 43,
    serp: ["link", "image", "shop", "location", "video"],
    kd: 20,
    traffic: 35,
    url: "www.ogene.com",
  },
  {
    keyword: "When we price goods",
    position: 10,
    increase: true,
    volume: 90,
    serp: ["link", "image", "shop", "video"],
    kd: 20,
    traffic: 35,
    url: "www.ogene.com",
  },
];
export default function Rankings() {
  return (
    <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto">
      <div className="grid h-full w-full overflow-auto border rounded-md ">
        <div className="flex w-full items-center justify-between p-6">
          <p className={` font-medium text-[#101828] text-lg`}>106 keywords </p>
          <span>
            <PlainButton title={"Add keyword"} icon={<FaPlus />} />
          </span>
        </div>
        <table className="py-4 w-full ">
          <thead className=" bg-[#EAECF0] h-12">
            <tr className="rounded-md items-center">
              <th className="font-medium text-xs text-[#475467] min-w-[360px]  text-left p-2">
                Keyword
              </th>
              <th className="font-medium text-xs text-[#475467]  text-left p-2 flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-1 text-xs`}>
                  {" "}
                  Position <FaArrowDown />{" "}
                </span>
              </th>
              <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                <span className={`flex items-center gap-1 text-xs`}>
                  {" "}
                  Volume{" "}
                  <button title="The volume of ...">
                    {" "}
                    <GoQuestion />
                  </button>{" "}
                  <FaArrowUp />{" "}
                </span>
              </th>
              <th className="font-medium text-xs text-[#475467]  min-w-[240px] text-left p-2 ">
                <span className={`flex items-center gap-1 text-xs`}>
                  {" "}
                  SERP features{" "}
                  <button title="The volume of ...">
                    {" "}
                    <GoQuestion />
                  </button>{" "}
                  <FaArrowUp />{" "}
                </span>
              </th>
              <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                <span className={`flex items-center gap-1 text-xs`}>
                  {" "}
                  KD{" "}
                  <button title="The volume of ...">
                    {" "}
                    <GoQuestion />
                  </button>{" "}
                </span>
              </th>
              <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                <span className={`flex items-center gap-1 text-xs`}>
                  {" "}
                  Traffic{" "}
                  <button title="The volume of ...">
                    {" "}
                    <GoQuestion />
                  </button>{" "}
                </span>
              </th>
              <th className="font-medium text-xs text-[#475467]   text-left p-2 ">
                URL{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {mocked.map((data) => {
              return (
                <tr className=" border-b">
                  <td className=" p-2 ">{data.keyword} </td>
                  <td className=" p-2 ">
                    <span className={`flex items-center text-xs p-1 gap-1`}>
                      {data.position}{" "}
                      <span
                        className={` py-0.5 px-2 rounded-full flex items-center gap-1 ${
                          data.position > 23
                            ? "bg-green-100 text-green-500"
                            : " bg-red-100 text-red-300"
                        }`}
                      >
                        {" "}
                        {data.position > 23 ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )}{" "}
                        {data.position}{" "}
                      </span>{" "}
                    </span>
                  </td>
                  <td className="  p-2 rounded-full">
                    <span className={``}>{data.volume} </span>{" "}
                  </td>
                  <td className="  p-2 rounded-full">
                    <span className={`flex items-center gap-2 text-sm`}>
                      {data.serp.includes("link") && <FaLink />}
                      {data.serp.includes("image") && <CiImageOn />}
                      {data.serp.includes("shop") && <IoCartOutline />}
                      {data.serp.includes("video") && <FaVideo />}
                    </span>{" "}
                  </td>
                  <td className="  p-2 rounded-full">
                    <span className={``}>{data.kd}% </span>{" "}
                  </td>
                  <td className="  p-2 rounded-full">
                    <span className={``}>{data.traffic}</span>{" "}
                  </td>
                  <td className="  p-2 rounded-full">
                    <span className={`text-blue-500 cursor-pointer`}>
                      {data.url}{" "}
                    </span>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <section className="w-full flex justify-between items-center py-4 px-4 ">
          <button
            type="button"
            className="border rounded-md p-2 px-4 sm:text-lg font-semibold flex items-center gap-2 hover:bg-gray-200"
          >
            <MdOutlineArrowForward className="sm:text-2xl text-lg rotate-180" />{" "}
            Previous
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="hover:bg-green-50  rounded-md p-2 px-4 "
            >
              1
            </button>
            <button
              type="button"
              className="hover:bg-green-50  rounded-md p-2 px-4 "
            >
              2
            </button>
          </div>
          <button
            type="button"
            className="border rounded-md p-2 px-4 sm:text-lg font-semibold flex items-center gap-2 hover:bg-gray-200"
          >
            Next
            <MdOutlineArrowForward className="sm:text-2xl text-lg" />
          </button>
        </section>
      </div>
    </main>
  );
}
