"use client"
import { CiShare2 } from 'react-icons/ci'
import FilledButton from '../component/FilledButton'
import Card from './Card';
import TraficOverview from './components/graphs/TraficOverview';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { BacklinkGraph } from './components/graphs/BacklinkGraph';
import KeywordTable from './components/tables/KeywordTable';
import { useSelector } from 'react-redux';
import { UserType } from '@/types/userType';
import ChangeLineChart from '../component/charts/Bars';
import { useEffect, useState } from 'react';
import ApiCall from '../utils/apicalls/axiosInterceptor';
import { RootState } from '../store';
import { calculatePercentage, millisecondsToSeconds } from '@/lib/DateFormater';
import { current } from '@reduxjs/toolkit';
import OrganicTrafficCard from './technical-seo/components/OrganicTrafficCard';
import OrganicKeywords from './technical-seo/components/OrganicKeywords';
import AverageTimeOnsite from './technical-seo/components/AverageTimeOnsite';

export default function Dashboard() {

  const [loaded, setLoaded] = useState(false)
  const User = useSelector((state: any)=> state);

  useEffect(()=>{
  setLoaded(true)
  },[loaded])

  const data = [
    { id: 1, keyword: 'The beginning of the new eorld order', rank: '3', change: 'Change' },
    { id: 2, keyword: 'Managing business for the future', rank: '4', change: 'Change' },
    { id: 3, keyword: 'Thumping your sales by doing the basics', rank: '3', change: 'Change' },
    { id: 4, keyword: 'Did the wallmart just shut down or about to shut down?', rank: '3', change: 'Change' },
  ]

  return (
    <section className=' mb-10 p-2 grid h-full overflow-auto '>
      <div className="flex w-full flex-col md:flex-row justify-between items-start flex-grow">
        <div className='flex flex-col'>
          <h1 className="text-2xl text-[#101828] font-semibold">Welcome back, { User.user.user.fullName} </h1>
          <p>Track, manage and boost your site’s SEO.</p>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <button className='w-full gap-2 border rounded-lg text-base p-3 flex items-center text-[#344054] font-semibold'>
              <CiShare2 /> Share
            </button>
          </span>
          <span>
            <FilledButton title="View recommendations" />
          </span>
        </div>
      </div>
  


      {loaded && 
        <section className="grid items-center grid-cols-1 md:grid-cols-3 pt-8 gap-2 justify-between">
        <OrganicTrafficCard />
        <OrganicKeywords />
        <AverageTimeOnsite />
      </section>
      }
      <section className='py-10 my-10' >
        <TraficOverview />
      </section>
      <div className="grid shadow-md border font-bold text-xl items-start h-[426px] mb-20 rounded-md p-2 md:p-6 w-full ">
        <div className="">
          <div className="flex w-full h-full items-start justify-between">
            <h1 className={`text-[#101828] flex items-center gap-4`}>
              Backlink status
              <RxQuestionMarkCircled />
            </h1>
            <select className={`border rounded-md p-2 text-[#344054] text-sm font-normal`}>
              <option className={``}>
                Last 12 months
              </option>
              <option className={``}>
                Last 6 months
              </option>
              <option className={``}>
                Last 3 months
              </option>
            </select>
          </div>
          <hr className='w-full mt-4' />
        </div>
        <div className=" h-full w-full max-w-[600px]">
          <BacklinkGraph />
        </div>

      </div>
      <section className='w-full mb-20 py-10 border rounded-md p-2 md:p-6 max-w-[654px] '>
        <div className="">
          <div className="flex font-bold w-full h-full items-start justify-between">
            <h1 className={`text-[#101828] flex items-center gap-4`}>
              Keyword ranking summary
              <RxQuestionMarkCircled />
            </h1>
          </div>
          <hr className='w-full mt-4' />
        </div>
        <div className=" h-full w-full ">
          <KeywordTable data={data} />

       
        </div>


      </section>
    </section>


  )
}
