
import SearchBox from '@/app/component/SearchBox'
import { mockedData } from '@/app/component/data/mockedData'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowUp } from 'react-icons/fa6'
import { GoQuestion } from 'react-icons/go'

export default function ReferingDomains() {
  return (
    <section className="grid gap-4 my-10 border shadow-sm rounded-md">
       {/* <div className="grid h-full w-full overflow-auto border rounded-md "> */}
        <div className="flex p-4 px-6 w-full items-center justify-between">
          <p className={` font-medium text-[#101828] items-center text-lg flex gap-4`}>6,150 Referring domains <span className='px-2 p-0.5 bg-[#F2F4F7] items-center rounded-full text-xs'> 7.1k backlinks</span> </p>
          <div className="flex">
          <SearchBox value={''} setValue={function (e: any): void {
            throw new Error('Function not implemented.')
          } } placeholder='Search refering domain' />
        </div>
        </div>
        <table className='py-4 w-full text-xs'>
          <thead className=' bg-[#EAECF0] h-12'>
            <tr className='rounded-md items-center'>
              <th className='font-medium text-xs text-[#475467]   text-left p-2 px-6'> 
              <span className={`flex items-center gap-1 text-xs`}> Referring domains </span>
              </th>
              
              <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                <span className={`flex items-center gap-1 text-xs`}> DTS <button title='The volume of ...'>
                </button> <FaArrowUp /> </span>
              </th>
              <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                <span className={`flex items-center gap-1 text-xs`}> Dofollow links  <button title='The volume of ...'> <GoQuestion />
                </button> </span>
              </th>
              <th className='font-medium text-xs text-[#475467]   text-left p-2 '>
                <span className={`flex items-center gap-1 text-xs`}> Nofollow links  <button title='The volume of ...'> <GoQuestion />
                </button> </span>
              </th>
             
              <th className='font-medium text-xs text-[#475467]   text-left p-2 '>First seen </th>
              <th className='font-medium text-xs text-[#475467]   text-left p-2 '>Last seen </th>
            </tr>
          </thead>
          <tbody>
            {
              mockedData.map((data)=> {
                return (
                  <tr className=' border-b'>
              <td className=' p-2 px-6 '>
                <span className='grid'>
                {/* {data.url}  */}
                
                <span className='text-primary'> {data.url}</span>
                </span>
              </td>
              <td className=' p-2 px-6 '> 
              <span className={`flex items-center text-xs p-1 gap-1`}>{data.position} <span className={` py-0.5 px-2 rounded-full flex items-center gap-1 `}>  </span>  </span>
              </td>
              
              <td className='  p-2  rounded-full'><span className={``}>{data.volume} </span> </td>
              <td className=' p-2  '>
                <span className='grid'>
                {data.volume} 
                
               
                </span>
              </td>
              
              
              <td className='  p-2  rounded-full'><span className={``}> 20th June,2024</span> </td>
              <td className='  p-2  rounded-full'><span className={` `}>10th July,2024 </span> </td>
            </tr>
                )
              })
            }
           
            
          </tbody>
        </table>
      {/* </div> */}
      </section>
  )
}
