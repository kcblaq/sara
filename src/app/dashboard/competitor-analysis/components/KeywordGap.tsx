import SearchBox from "@/app/component/SearchBox";
import { SelectorDropdownMenu } from "@/app/component/SelectDropdownMenu";
import { mockedData } from "@/app/component/data/mockedData";
import { ShortenNumber } from "@/app/utils/ShortenedNumber";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";

export default function KeywordGap() {
    const [selected, setSelected] = useState('Volume')
    

    return (
        <section className={`grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20
        `}>
            <div className={` flex items-center gap-4`}>
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={selected} setSelected={() => setSelected('')} />
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"KD"} setSelected={() => setSelected('')} />
                <SelectorDropdownMenu items={['Volume', 'High', 'Low']} selected={"Competition"} setSelected={() => setSelected('')} />
            </div>
            <div className={`border rounded-lg w-full pt-7`}>
                <div className="flex w-full items-center p-6 justify-between">
                    <h3 className="text-[#101828] text-lg text-left font-medium">
                        2344 Keywords
                    </h3>
                    <SearchBox value={""} setValue={function (e: any): void {
                        throw new Error("Function not implemented.");
                    }} />
                </div>
                <table className="w-full">
                    <thead className="w-full bg-[#EAECF0]">
                        <tr className="text-[#475467] font-normal text-xs">
                            <th className="pl-6 py-6">
                                <span className={`flex gap-2 items-center `}>
                                    <input type="checkbox" value={``} />
                                    <p> Keywords</p>
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Volume</p>
                                    <BsArrowUp />
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> KD</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Competition</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Your rank</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                    <BsArrowDown />
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Domain 1</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Domain 2</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th>
                            <th className="pl-6 py-6">
                                <span className={`flex gap-1 items-center `}>
                                    <p> Domain 3</p>
                                    <button className="" title="Here..."> <FaRegCircleQuestion /></button>
                                </span>
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            mockedData.map((item,index) => {
                                return (
                                    <tr className={`${index === mockedData.length - 1 ? '' : 'border-b'}`} key={item.position}>
                                        <td className="pl-6 py-6">
                                            <span className={`flex gap-2 items-center `}>
                                                <input type="checkbox" value={``} />
                                                <p> {item.keyword} </p>
                                            </span>
                                        </td>
                                        <td>
                                            {ShortenNumber(item.traffic)}
                                        </td>
                                        <td className=""> 
                                            <span className={` rounded-3xl p-1 px-3 ${item.kd < 30 ? 'bg-[#FEF3F2] text-[#F04438]':'bg-[#F6FEF9] text-[#6CE9A6]'}`}>
                                                {item.kd}
                                            </span> 
                                        </td>
                                        <td>{item.cpc} </td>
                                        <td>{item.cpc} </td>
                                        <td className="bg-[#EFF8FF] pl-4">{item.cpc} </td>
                                        <td className="bg-[#FDF2FA] pl-4">{item.kd} </td>
                                        <td className="bg-[#F4F3FF] pl-4">{item.kd} </td>
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
