

import SearchBox from "@/app/component/SearchBox";
import { SelectorDropdownMenu } from "@/app/component/SelectDropdownMenu";
import { mockedData } from "@/app/component/data/mockedData";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";

export default function LinkGap() {
  const [selected, setSelected] = useState('DTS')

  return (
    <section className={`grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20
        `}>
      <div className={` flex items-center gap-4`}>
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={selected} setSelected={() => setSelected('')} />
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"Traffic"} setSelected={() => setSelected('')} />
        <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"DTS"} setSelected={() => setSelected('')} />
      </div>
      <div className={`border rounded-lg w-full pt-7`}>
        <div className="flex w-full items-center p-6 justify-between">
          <h3 className="text-[#101828] text-lg text-left font-medium">
            2344 Reffering domains
          </h3>
          <SearchBox value={""} setValue={function (e: any): void {
            throw new Error("Function not implemented.");
          }} />
        </div>
        <table className="w-full">
          <thead className="w-full bg-[#EAECF0] text-left">
            <tr className="text-[#475467] font-normal text-xs">
              <th className="p-4">
                Reffering domains
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> DTS</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>
              <th className="p-4">
                {/* <span className={`flex gap-1 items-center `}> */}
                  <p> Traffic</p>
                  {/* <button className="" title="Here..."> <FaRegCircleQuestion /></button> */}
                {/* </span> */}
              </th>
              <th className="p-4">
                {/* <span className={`flex gap-1 items-center `}> */}
                  <p className={`flex gap-1 items-center `}> Top referring page to domain1.com <button className="" title="Here..."> <FaRegCircleQuestion /></button></p>
                  
                {/* </span> */}
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> PTS</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> Top referring page domain2.com</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> PTS</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> Top referring page domain3.com</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>
              <th className="p-4">
                <span className={`flex gap-1 items-center `}>
                  <p> PTS</p>
                  <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                </span>
              </th>

            </tr>

          </thead>
          <tbody>
            {
              mockedData.map((item, index) => {
                return (
                  <tr className={`${index === mockedData.length - 1 ? '' : 'border-b'} text-left`} key={item.position}>
                    <td className="p-4 text-primary">
                        <p> {item.url} </p>
                    </td>
                    <td className="p-4">
                      {item.kd}
                    </td>
                    <td className=" p-4">{item.traffic} </td>

                    <td className="bg-[#EFF8FF] p-4">
                      <span className={`  p-1 px-3 flex flex-col`}>
                        {item.keyword}
                        <span className="text-primary">{item.url}</span>
                      </span>
                    </td>
                    <td className="bg-[#EFF8FF]">{item.cpc} </td>


                    <td className="bg-[#F4F2FA] p-4 ">

                      <span className="flex flex-col">
                        {item.keyword} 
                      <span className="text-primary cursor-pointer">{item.url} </span>
                      </span>
                      </td>
                    <td className="bg-[#F4F2FA] p-4">{item.kd} </td>


                    <td className="bg-[#F4F3FF] p-4 ">

                      <span className="flex flex-col">
                        {item.keyword} 
                      <span className="text-primary cursor-pointer">{item.url} </span>
                      </span>
                      </td>
                    <td className="bg-[#F4F3FF] p-4">{item.kd} </td>

                    
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
