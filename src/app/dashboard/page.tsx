
import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import FilledButton from '../component/FilledButton'
import Card from './Card';
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  return (
    <section className='py-12 grid h-full '>
      <div className="flex w-full flex-col md:flex-row justify-between items-start flex-grow">
        <div className='flex flex-col'>
          <h1 className="text-2xl text-[#101828] font-semibold">Welcome back, John</h1>
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
      <div className="grid items-center grid-cols-1 md:grid-cols-3 pt-8 gap-2 overflow-scroll justify-between">
        <Card title='Organic trafic' date='Jan, 24' amount='2.5M' style='text-red-500' percent='10%'  />
        <Card title='Organic trafic' date='Jan, 24' amount='2.5M' style='text-green-500' percent='40%' />
        <Card title='Organic trafic' date='Jan, 24' amount='2.5M' style='text-green-500' percent='25%'  />
      </div>
    </section>


  )
}
