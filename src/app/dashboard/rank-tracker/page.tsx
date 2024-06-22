"use client"

import FilledButton from '@/app/component/FilledButton'
import PlainButton from '@/app/component/PlainButton'
import React, { Fragment, useState } from 'react'
import { IoCloudUploadOutline, IoSettingsOutline } from 'react-icons/io5'
import ToggleMobile from '../components/ToggleMobile'
import CountryPick from '@/app/dashboard/rank-tracker/components/CountryPick'
import SearchEnginePick from '@/app/dashboard/rank-tracker/components/SearchEnginePick'
import OrganicPick from './components/OrganicPick'
import { Tab } from '@headlessui/react'
import RankOverview from './components/RankOverview'
import Rankings from './components/Rankings'
import { useQuery } from '@tanstack/react-query'
import ApiCall from '@/app/utils/apicalls/axiosInterceptor'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
// import PageDistributions from './components/PageDistributions'


const tabs = [
  { title: "Overview", content: <RankOverview /> },
  { title: "Rankings", content: <Rankings /> },
  // { title: "Page distributions", content: <PageDistributions /> }
]
export default function page() {
  const [mobile, setMobile] = useState(false)
  const activeProperty = useSelector((state:RootState)=> state.property.activeProperty);
  const {data} = useQuery({
    queryKey: ['rank'],
    queryFn: async () => await ApiCall.get('/crawl/rank-tracker',{
      params: {
        url: activeProperty,
        se: "Google",
      }
    })
  })
  console.log("RANK",data)
  return (
    <main className='grid w-full h-full items-start content-start gap-6'>
      <section className={`flex items-center w-full justify-between`}>
        <div className='w-full'>
          <h3 className="text-[#101828] text-2xl font-semibold">Rank tracker</h3>
        </div>
        <div className="flex items-center gap-4 w-full justify-end">
          <div className=""> <FilledButton title={'Re-track rankings'} /></div>
          <div> <button className={`w-full bg-[#EFF8FF] text-primary gap-2  items-center flex justify-center border h-[40px] rounded-lg text-base p-2 font-semibold hover:bg-gray-100 `}>
            <IoCloudUploadOutline /> Export
          </button></div>
          <div className=""> <PlainButton title={''} icon={<IoSettingsOutline />
          } /></div>
        </div>
      </section>
      <section className='w-full gap-6 flex items-center'>
        <ToggleMobile mobile={mobile} setMobile={setMobile} />
        <CountryPick />
        <SearchEnginePick />
        <OrganicPick />
      </section>
      <section className={``}>
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
