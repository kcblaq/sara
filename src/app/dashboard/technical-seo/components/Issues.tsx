import { useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const mockedData = [
  { category: "Crawlability and indexibility", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the ..." }] },
  { category: "Crawlability", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the  ..." }] },
  { category: "Site performance", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the ..." }] },
  { category: "Internal linking", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the ..." }] },
  { category: "Load speed", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the Whatever it takes to dig out the Whatever it takes to dig out the ..." }] },
  { category: "Mobile related", issues: [{ title: "Links without correct url", description: "Whatever it takes to dig out the ..." }] }
]

export default function Issues() {
  const [currentFilter, setCurrentFilter] = useState('All issues')
  const [issueCategory, setIssueCategory] = useState('')
  const tabsFilter = [
    { name: "All issues" },
    { name: "Errors", icon: <Image src={'/dashboard/error.svg'} alt="Error" width={24} height={24} /> },
    { name: "Warnings", icon: <Image src={'/dashboard/warning.svg'} alt="Warning issues" width={24} height={24} /> },
    { name: "Notices", icon: <Image src={'/dashboard/notices.svg'} alt="Notices" width={24} height={24} /> },
    { name: "Fixed", icon: <Image src={'/dashboard/fixed.svg'} alt="Fixed issues" width={24} height={24} /> },
  ]

  function IssueCategoryCard({ title }: { title: string }) {
    return (
      <div className='flex items-center justify-between w-full' onClick={() => setIssueCategory(title)}>
        <h2 className="text-[#344054] text-lg font-semibold"> {title} </h2>
        <span className={`${title == issueCategory ? 'rotate-180' : ''} cursor-pointer`}> <IoIosArrowDown /></span>
      </div>
    )
  }
  function ChildIssues({ title, number }: { title: string, number: number }) {
    return (
      <div className='text-sm flex items-center justify-between w-full cursor-pointer'>
        <div className='flex items-center gap-2'>
          <img src={'/dashboard/error.svg'} alt="Issue icon" />
          <p className="">{title} </p>
        </div>
        <span className=" text-xs p-0.5 bg-yellow-700 rounded-full">
          {number}
        </span>
      </div>
    )
  }

  return (
    <main className="pb-14 grid w-full gap-8 overflow-auto ">
      <section className="flex h-16 flex-wrap items-center z-10 bg-white justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {
            tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item.name}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"}`} onClick={() => setCurrentFilter(item.name)}>
                {item.icon && item.icon} {item.name}
              </button>
            ))
          }
        </div>
        <div className="flex">
          <div className="flex relative rounded-md w-[320px]  ">
            <input type='search' className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 " />
            <CiSearch className=' absolute top-4 left-4 ' />

          </div>
        </div>
      </section>
      <section className=" grid grid-cols-1 gap-8 md:grid-cols-3 overflow-auto h-full ">
        <div className="flex flex-col gap-2 col-span-1 border overflow-y-scroll py-8 p-2 2xl:p-4 shadow-sm rounded-md">
          {
            mockedData.map((item) => {
              return (
                <div key={item.category} >
                  <IssueCategoryCard title={item.category} />
                  {
                    item.category === issueCategory && (
                      <div>
                        {
                          item.issues.map((issue) => {
                            return (
                              <div className="">
                                <ChildIssues title={issue.title} number={2333} />
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }

                </div>
              )
            })
          }

        </div>

        <div className="flex flex-col col-span-2 gap-4 ">
          <div className="border shadow-sm overflow-auto rounded-md w-full min-h-[200px] ">
            <div className="flex gap-6 w-full p-2 items-center font-semibold text-[#101828] text-lg">
              <img src="/dashboard/notice.png" alt={issueCategory} />
              <h3 className="">{issueCategory} </h3>
            </div>
            <div className="overflow-auto h-[30vh] ">
              <table className="w-full mt-6 text-left ">

                <thead className="bg-[#EAECF0] h-14 text-sm font-normal">
                  <tr>
                    <th className="p-2"> URL </th>
                    <th className="p-2"> Page depth </th>
                    <th className="p-2"> Internal links </th>
                    <th className="p-2"> Status code </th>
                    <th className="p-2"> Indexable </th>
                  </tr>
                </thead>

                {/* <tbody className={`p-2 w-full overflow-auto h-40`}> */}
                <tbody className="overflow-auto h-40 p-2 w-full">
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2"> www.getcodeword.com</td>
                    <td className="p-2"> 2</td>
                    <td className="p-2"> 32</td>
                    <td className="p-2"> 100</td>
                    <td className="p-2"> Yes</td>
                  </tr>
                </tbody>


              </table>
            </div>
          </div>
          <div className="border shadow-sm flex flex-col gap-4  rounded-md w-full p-2 2xl:p-4">
            <h2 className=" font-semibold text-[#344054] text-2xl ">Issue Description </h2>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi labore id ullam nostrum corrupti quasi earum, velit tenetur architecto veritatis ratione nulla optio. Placeat voluptatem hic, aperiam praesentium saepe aliquid.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}
