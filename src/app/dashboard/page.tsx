"use client"
import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import FilledButton from '../component/FilledButton'
import Card from './Card';
import ChangeLineChart from '../component/charts/bars';
import TraficOverview from './components/graphs/TraficOverview';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { BacklinkGraph } from './components/graphs/BacklinkGraph';
import KeywordTable from './components/tables/KeywordTable';

export default function Dashboard() {
  const data = [
    { id: 1, keyword: 'The beginning of the new eorld order', rank: '3', change: 'Change' },
    { id: 2, keyword: 'Managing business for the future', rank: '4', change: 'Change' },
    { id: 3, keyword: 'Thumping your sales by doing the basics', rank: '3', change: 'Change' },
    { id: 4, keyword: 'Did the wallmart just shut down or about to shut down?', rank: '3', change: 'Change' },
  ]
  const name = sessionStorage.getItem('fullName')
  return (
    <section className=' mb-10 p-2 grid h-full overflow-auto '>
      <div className="flex w-full flex-col md:flex-row justify-between items-start flex-grow">
        <div className='flex flex-col'>
          <h1 className="text-2xl text-[#101828] font-semibold">Welcome back, {name} </h1>
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



      <section className="grid items-center grid-cols-1 md:grid-cols-3 pt-8 gap-2 justify-between">
        <Card title='Organic traffic' date='Jan, 24' amount='2.5M' style='text-red-500' percent='10%' chart={<ChangeLineChart data1={0} data2={10} data3={50} data4={4} />} />
        <Card title='Organic Keywords' date='Jan, 24' amount='1.5M' style='text-green-500' percent='40%' chart={<ChangeLineChart data1={100} data2={10} data3={0} data4={41} />} />
        <Card title='Average time on site' date='Jan, 24' amount='500K' style='text-green-500' percent='25%' chart={<ChangeLineChart data1={0} data2={0} data3={0} data4={400} />} />
      </section>
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
