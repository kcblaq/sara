"use client"
import PlainButton from "@/app/component/PlainButton";
import { CiSettings } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CountryPickAllLocationDefault } from "../rank-tracker/components/CountryPick";
import LinkBuildingOverview from "./component/LinkBuildingOverview";
import BacllinkPages from "./component/BacllinkPages";
import ReferingDomains from "./component/ReferingDomains";
import LinkBuildingOpportunities from "./component/LinkBuildingOpportunities";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";


export default function LinkBuilding() {
  const tabs = [
    { title: "Backlink overview", content: <LinkBuildingOverview /> },
    { title: "Backlink pages", content: <BacllinkPages /> },
    { title: "Reffering domains", content: <ReferingDomains /> },
    { title: "Linking building opportunities", content: <LinkBuildingOpportunities /> },
  ]
  return (
    <main className='grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto'>
      <section className={`flex justify-between w-full items-center gap-4 text-[#101828] `}>
        <h1 className={`font-semibold text-4xl 2xl:text-5xl`}>Link building </h1>
        <div className="flex w-full md:w-1/2 items-center justify-end gap-2 md:gap-4">
          <span className="">
            <button className='rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500' >
              Update data
            </button>
          </span>
          <span className=''>
            <PlainButton moreClass="text-primary bg-[#EFF8FF]" title="Share" icon={<IoCloudUploadOutline />
            } />
          </span>
          <span className="p-3 rounded-md border cursor-pointer "><CiSettings /></span>
        </div>
      </section>
      <section className="flex items-center gap-6">
        <span className='flex items-center gap-3 text-lg'>
          <p className={` font-medium text-[#101828] `}>Last updated: </p>
          <p className='font-normal'> 4th March, 2024 </p>
        </span>
        <CountryPickAllLocationDefault title="All location" />
      </section>
      <section className="">
      <Tab.Group>
            <Tab.List className="flex gap-4 w-full" >
              {
                tabs.map((tab) => {
                  return (
                    <div key={tab.title} >
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <p
                            className={
                              ` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${selected ? 'text-primary border-b-2 border-primary' : ' text-[#667085] active:border-none'}`
                            }
                          >
                            {tab.title}
                          </p>
                        )}
                      </Tab>
                    </div>
                  )
                })
              }



            </Tab.List>
            <hr className="w-full" />
            <div className={` h-full w-full overflow-auto  `}>
              <Tab.Panels>
                {
                  tabs.map((tab) => {
                    return (
                      <div key={tab.title} className='h-full '>
                        <Tab.Panel>

                          {tab.content}
                        </Tab.Panel>
                      </div>
                    )
                  })
                }
              </Tab.Panels>
            </div>

          </Tab.Group>
      </section>
    </main>
  )
}
