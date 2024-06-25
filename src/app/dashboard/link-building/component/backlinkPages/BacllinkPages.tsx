import PlainButton from '@/app/component/PlainButton';
import { mockedData } from '@/app/component/data/mockedData';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { CiImageOn, CiSearch } from 'react-icons/ci'
import { FaPlus, FaArrowDown, FaArrowUp, FaLink, FaVideo } from 'react-icons/fa6';
import { GoQuestion } from 'react-icons/go';
import { IoCartOutline, IoChevronDownOutline } from 'react-icons/io5'

export default function BacllinkPages() {
  const [currentFilter, setCurrentFilter] = useState('All issues')
  const [attribute, setAttribute] = useState('All issues')

  const tabsFilter = ['All backlinks', "Active", 'New', 'Lost']
  return (
    <main className='py-10 grid gap-8 overflow-auto '>
      <section className="flex h-16 flex-wrap items-center z-10 bg-white justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {
            tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${currentFilter === item ? "bg-[#EFF8FF]" : "bg-[#FFF]"}`} onClick={() => setCurrentFilter(item)}>
                {item}
              </button>
            ))
          }
        </div>
        <div className="flex items-center gap-4">
          <Menu as="div" className=" relative inline-block text-left">

            <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              Attributes

              <IoChevronDownOutline
                className="-mr-1 ml-2  text-black"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-50 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <span className="px-1 py-1 ">
                  {
                    ['Main', 'Everyone'].map((item, i) => {
                      return <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => setAttribute(item)}
                          >

                            {item}
                          </button>
                        )}
                      </Menu.Item>
                    })
                  }

                </span>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="flex relative rounded-md w-[320px]  ">
            <input placeholder='Search referring domain or pages' type='search' className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 " />
            <CiSearch className=' absolute top-4 left-4 ' />

          </div>
        </div>
      </section>
      <section className=" h-full">
        <main className='grid w-full h-full items-start content-start gap-6 my-10 mb-20 overflow-auto'>
          <div className="grid h-full w-full overflow-auto border rounded-md ">
            <div className="flex w-full items-center justify-between p-6">
              <p className={` font-medium text-[#101828] text-lg`}> 6,150 Referring pages</p>
            </div>
            <table className='py-4 w-full text-xs'>
              <thead className=' bg-[#EAECF0] h-12'>
                <tr className='rounded-md items-center'>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2'>
                    <span className={`flex items-center gap-1 text-xs`}> Referring page title and URL <button title='The volume of ...'> <GoQuestion />
                    </button></span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]  text-left p-2 flex items-center gap-2 mt-2'>
                    <span className={`flex items-center gap-1 text-xs`}> PTS <button title='The volume of ...'> <GoQuestion />
                    </button> <FaArrowUp /> </span>

                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> DTS <button title='The volume of ...'> <GoQuestion />
                    </button> <FaArrowUp /> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Anchor and target URL  <button title='The volume of ...'> <GoQuestion />
                    </button> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Link type <button title='The volume of ...'> <GoQuestion />
                    </button>  </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                    <span className={`flex items-center gap-1 text-xs`}> Status & Attr. <button title='The volume of ...'> <GoQuestion />
                    </button> </span>
                  </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>First seen </th>
                  <th className='font-medium text-xs text-[#475467]   text-left p-2 '>Last seen </th>
                </tr>
              </thead>
              <tbody>
                {
                  mockedData.map((data) => {
                    return (
                      <tr className=' border-b'>
                        <td className=' p-2 '>
                          <span className='grid'>
                            {data.keyword}

                            <span className='text-primary'> {data.url}</span>
                          </span>
                        </td>
                        <td className=' p-2 '>
                          <span className={`flex items-center text-xs p-1 gap-1`}>{data.position} <span className={` py-0.5 px-2 rounded-full flex items-center gap-1 `}>  </span>  </span>
                        </td>

                        <td className='  p-2 rounded-full'><span className={``}>{data.volume} </span> </td>
                        <td className=' p-2 '>
                          <span className='grid'>
                            {data.keyword}

                            <span className='text-primary'> {data.url}</span>
                          </span>
                        </td>
                        <td className='  '><span className={`flex rounded-full p-2  text-center justify-center items-center bg-[#F2F4F7] gap-2 text-sm`}>
                          <p>{data.volume > 30 ? 'Text' : 'Image'}</p>
                        </span> </td>
                        <td className='  p-2 rounded-full'><span className={`flex items-center gap-2 `}>
                          <span className={`rounded-full p-2 px-3 ${data.volume % 2 == 0 ? 'text-green-500 bg-green-200' : 'bg-red-200 text-red-500'}`}>
                            {data.volume % 2 == 0 ? "New" : "Lost"}
                          </span>
                          <span className={`rounded-full p-2 px-3 ${data.volume % 2 == 0 ? 'text-green-500 bg-green-200' : 'bg-red-200 text-red-500'}`}>

                            {data.volume > 30 ? "Follow" : "Nofollow"}
                          </span>
                        </span> </td>
                        <td className='  p-2 rounded-full'><span className={``}> 20th June,2024</span> </td>
                        <td className='  p-2 rounded-full'><span className={` `}>10th July,2024 </span> </td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </table>
          </div>
          <section className='w-full'>

          </section>
        </main>
      </section>
    </main>
  )
}
