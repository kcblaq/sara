import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { ExploreContentTableColumns } from "../columns/content-analysis-column";
import { exploreContentTableData } from "../data/exploreContentTableData";

export default function ExploreContent() {
  const [currentTab, setCurrentTab] = useState("All pages");
  const tab = ["All pages", "Blog", "News"];

  return (
    <section className="flex flex-col ">
      <div className="flex justify-between items-center gap-2 ">
        <div className="flex gap-2">
          {tab.map((item, i) => (
            <button
              onClick={() => setCurrentTab(item)}
              key={i}
              className={`border py-2 rounded-md px-5 ${
                currentTab === item && "bg-[#EFF8FF] border-none"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">Domain rank</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="URL rank">URL rank</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Rating">Rating</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">CQS</option>
          </select>
          <select name="" id="" className="rounded-md border p-2">
            <option value="Domain rank">Date published</option>
          </select>
        </div>
        <div className="rounded-md border p-2">
          <label htmlFor="sortBy">Sort by:</label>
          <select name="" id="sortBy" className="border-none outline-none">
            <option value="Domain rank">Ascending</option>
          </select>
        </div>
      </div>

      <div className="border rounded-md my-8 overflow-x-auto w-full">
        <h1 className="p-4 text-lg font-semibold">6,150 results</h1>
        <DataTable
          columns={ExploreContentTableColumns}
          data={exploreContentTableData}
        />
      </div>
    </section>
  );
}
