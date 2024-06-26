"use client"
import { ButtonFilled, ButtonOutlined } from '@/app/component/FilledButton'
import Image from 'next/image'
import React from 'react'
import { faqdata, pricingdata } from './data'

export default function PricingComponent() {
  return (
    <main className='grid gap-16 lg:gap-24'>
      <section className='text-left grid gap-4 p-4 mt-16 lg:mt-24 lg:px-28'>
        <p className='text-primary text-sm font-semibold lg:text-base'> Pricing plans</p>
        <h3 className='text-[#101828] text-4xl font-semibold lg:text-5xl'> Simple, transparent pricing</h3>
        <p className='text-[#475467] font-normal text-xl leading-7'> Webmaxi is accessible to all websites, no matter the size.</p>
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-7 p-4 lg:px-28'>
        {pricingdata.map((data, i) => {
          return (

            <div key={i} className='h-[582px] flex flex-col justify-between max-w-[430px] w-full rounded-2xl border shadow-lg p-6 lg:p-8'>
              <div className="flex flex-col justify-center items-center w-full">
                <Image src={data.icon} width={40} height={40} alt='Basic plan' />
                <p className="text-primary mt-[20px] font-semibold text-xl">{data.title} </p>
                <h3 className="text-[#101828] font-semibold text-5xl mt-2">{data.amount} </h3>
                <p className='text-base text-[#475467] mt-2'> Billed annually.</p>
              </div>
              <div className="flex flex-col h-full  justify-between mt-8">
                <div className="grid gap-4">
                  {
                    data.points.map((point, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <Image src={`/pricing/item.png`} width={24} height={24} alt='Each point' />
                        <p className="text-[#475467] font-normal text-base"> {point} </p>
                      </div>

                    ))
                  }
                </div>

              </div>
              <div className=" flex justify-center">
                <ButtonFilled title='Get started' handleClick={function (): void {
                  throw new Error('Function not implemented.')
                }} />
              </div>
            </div>
          )
        })

        }
      </section>
      <section className='grid p-4 lg:px-28 gap-16'>
        <div className="">
          <h3 className='text-[#101828] text-4xl font-semibold'>
            FAQs
          </h3>
          <div className="max-w-[768px]">
            <p className='text-xl text-[#475467] mt-5 leading-8'>
              Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
              <span className=' underline cursor-pointer'> Please chat our friendly team.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16 w-full">
          {
            faqdata.map((data) => (
              <div key={data.title} className="flex flex-col gap-2">
                <h4 className=" font-semibold text-[#101828] text-lg">{data.title} </h4>
                <p className="text-[#475467]"> {data.answer}</p>
              </div>
            ))
          }
        </div>
        <div className="min-h-[130px] gap-6 w-full p-8 px-5 lg:p-8 lg:px-8 rounded-2xl bg-[#F9FAFB] flex-col lg:flex-row flex justify-between items-start lg:items-center">
          <div className="flex flex-col ">
            <h4 className='font-medium text-[#101828] text-xl'> Still have questions?</h4>
            <p className="text-lg text-[#475467]"> Can’t find the answer you’re looking for? Please chat to our friendly team.</p>

          </div>
          <div className='justify-start flex'>
            <ButtonFilled title='Get in touch' handleClick={() => alert("Coming soon")} />
          </div>
        </div>


      </section>
      <section className="bg-[#F9FAFB] w-full min-h-[286px]">
        <div className="flex flex-col gap-4 lg:flex-row justify-between w-full p-4  lg: py-24 lg:px-20">
          <div className="flex flex-col gap-5">
            <h4 className='text-[#101828] lg:text-4xl font-semibold text-3xl'>Start your free trial today</h4>
            <p className='text-[#101828] text-xl font-normal'> Everything you need to track, manage and boost your site’s SEO.</p>
          </div>
          <div className='flex items-center gap-3'>
            <div > <ButtonOutlined title={'Learn more'} handleClick={function (): void {
              throw new Error('Function not implemented.')
            }} /> </div>
            <div>
              <ButtonFilled title={'Get started'} handleClick={function (): void {
                throw new Error('Function not implemented.')
              }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
