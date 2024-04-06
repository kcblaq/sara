import FilledButton from '@/app/component/FilledButton'
import React from 'react'

export default function DashboardOverviewPlaceholder() {
  return (
    <div className='h-full w-full flex-col gap-6 items-start flex justify-start px-[95px] pt-[143px]'>
        <div className='flex flex-col gap-4'>

        <h1 className='text-[#101828] font-semibold text-4xl'>Track, manage and boost your site’s SEO.</h1>
        <p className='text-xl font-medium'>Add your site domain to start your SEO journey now!</p>
        </div>
        <div className="flex flex-col w-full">
          <label className=''>
          Enter your domain 
          </label>
          <div className='flex gap-4 items-center'>
          <input className='p-2 min-w-[620px] border rounded-md ' placeholder='e.g domain.com' />
         <div >
         <FilledButton title="Let's go" />
         </div>
          </div>
        </div>
    </div>
  )
}
