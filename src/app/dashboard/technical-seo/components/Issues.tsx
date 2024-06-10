
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
// import { setLoading } from "@/redux/features/loaderSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { CategoryItem, IssuesType } from "@/types/technicalseo/IssuesType";
import { BsDot } from "react-icons/bs";
import Loader from "@/app/component/Loader";
// import { issuesDetails } from "./data";


export default function Issues() {

  const categories: { [key: string]: any[] } = {

  }
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty);
  // const loading = useSelector((state: RootState) => state.loading.loading);
  const [currentFilter, setCurrentFilter] = useState('All issues')
  const [issueData, setissueData] = useState<IssuesType | null>(null)
  // const [issueCategory, setIssueCategory] = useState<IssueData | null>(null)
  const [loading, setLoading] = useState(true);
  const [first, setfirst] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentCategoryDetail, setCurrentCategoryDetail] = useState<CategoryItem | null>(null)
  // const [currentCategoryDetail, setCurrentCategoryDetail] = useState<CategoryItem | null>(
  //   categories[Object.keys(categories)[0]][0]
  // );

  const tabsFilter = [
    { name: "All issues" },
    { name: "Errors", icon: <Image src={'/dashboard/error.svg'} alt="Error" width={24} height={24} /> },
    { name: "Warnings", icon: <Image src={'/dashboard/warning.svg'} alt="Warning issues" width={24} height={24} /> },
    { name: "Notices", icon: <Image src={'/dashboard/notices.svg'} alt="Notices" width={24} height={24} /> },
    { name: "Fixed", icon: <Image src={'/dashboard/fixed.svg'} alt="Fixed issues" width={24} height={24} /> },
  ]

  
  issueData?.issues[0].errors.find((item) => {
    const single = item.category
    if (!categories.hasOwnProperty(single)) {
      categories[single] = []
    }
    categories[single].push(item)
  })


  issueData?.issues[0].notice.find((item) => {
    const single = item.category
    if (!categories.hasOwnProperty(single)) {
      categories[single] = []
    }
    categories[single].push(item)
  })
  issueData?.issues[0].warnings.find((item) => {
    const single = item.category
    if (!categories.hasOwnProperty(single)) {
      categories[single] = []
    }
    categories[single].push(item)
  })

  // console.log("CUR",currentCategoryDetail)



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiCall.get('/crawl/technical-seo', {
          params: {
            limit: 100,
            platform: 'desktop',
            url: removeTrailingSlash(activeProperty),
            page: 'issues'
          }
        });
        setissueData(response.data);
        // console.log("RES",issueData);
      } catch (error: any) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  // }, [activeProperty]);
  }, []);


// console.log("DETAIL",currentCategoryDetail)

  // issueData?.issues[0]?.warnings?.find((item) => {
  //     if(categories.hasOwnProperty(category)){
  //       categories[category].push(item)
  //     }

  //   })
  interface Props {
    title: string;
  }

  // function IssueCategoryCard({ title }: Props) {
  //   return (
  //     <div className='flex items-center justify-between w-full' onClick={() => setIssueCategory(title)}>
  //       <h2 className="text-[#344054] text-lg font-semibold"> {title} </h2>
  //       <span className={`${title == issueCategory ? 'rotate-180' : ''} cursor-pointer`}> <IoIosArrowDown /></span>
  //     </div>
  //   )
  // }
  // function ChildIssues({ title, number }: { title: string, number: number }) {
  //   return (
  //     <div className='text-sm flex items-center justify-between w-full cursor-pointer'>
  //       <div className='flex items-center gap-2'>
  //         <img src={'/dashboard/error.svg'} alt="Issue icon" />
  //         <p className="">{title} </p>
  //       </div>
  //       <span className=" text-xs p-0.5 bg-yellow-700 rounded-full">
  //         {number}
  //       </span>
  //     </div>
  //   )
  // }

  // console.log("CATEG", currentCategory)
  return (
    <>

      <main className="pb-14 grid w-full gap-8 overflow-auto min-h-[400px] ">
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
        {
          loading ? <div className=" w-full h-10 flex items-center justify-center"> <Loader /> </div> :
          <section className=" grid grid-cols-1 gap-8 md:grid-cols-3 max-h-[80dvh]  overflow-auto h-full ">
            <div className="flex flex-col h-full gap-2 col-span-1 border   overflow-y-scroll py-8 p-2 2xl:p-4 shadow-sm rounded-md">

              {/* <div className="grid" style={{ height: '100%' }}>
                <div className={`w-full flex justify-between items-center `} >
                  <h2 className={`text-[#344054] font-semibold text-lg`}>
                    Crawlability and indexibility
                  </h2>
                  <IoIosArrowDown className={`${!first && 'rotate-180'} cursor-pointer transition-all ease-out delay-300`} onClick={() => setfirst(!first)} />
                  
                </div>
                {
                  !first && <div className={`flex justify-between w-full`}>
                    <div className="flex gap-2 items-center text-[#344054] font-normal cursor-pointer" onClick={()=> alert('Clicked')}>
                      {tabsFilter[2].icon}
                      <p className={``}>Pages with duplicate content issues </p>
                    </div>
                    <span className="p-1 text-sm  rounded-3xl bg-green-300">
                      122
                    </span>

                  </div>
                }
              </div> */}
              <div className="grid gap-4 my-4 transition-all ease-linear delay-300" style={{ height: '100%' }}>
                {
                  Object.entries(categories).map(([key, value]) => {

                    // console.log("VALUES", value)
                    return (
                      <>
                        <div className={`w-full flex justify-between cursor-pointer items-center `} onClick={()=> {
                          currentCategory === key ? setCurrentCategory('') : setCurrentCategory(key)
                        }} >
                          <h2 className={`text-[#344054] font-semibold text-lg`}>
                            {key}
                          </h2>
                          <IoIosArrowDown className={`${currentCategory == key && 'rotate-180'} cursor-pointer transition-all ease-out delay-300`} onClick={() => setfirst(!first)} />

                        </div>
                        {
                      currentCategory === key &&
                      value.map((eachVal, i) => (
                        <div key={i} className={`w-full space-y-1  text-left gap-2 cursor-pointer grid items-center`} >
                          {
                            
                            eachVal.categoryItems.map((catItem: any, index: number) => (
                              <div key={index} className="text-left hover:bg-blue-200 flex line-clamp-2 gap-2 w-full" onClick={()=> setCurrentCategoryDetail(catItem)}>
                                <Image src={'/dashboard/error.svg'} alt="Error" width={24} height={24} />
                                <span className="">{catItem.title.replace(/\s+/g, ' ')}</span>
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                      </>
                    )
                  })

                }

              </div>




              {/* {
                  currentCategoryDetail.map((item, i) => {
                    return <div key={i} className="flex w-full h-full cursor-pointer  py-2 justify-between items-center" onClick={() => {
                      setIssueCategory(item)
                    }}>
                      <h3 className=" w-[90%] truncate text-[#344054] font-semibold flex items-center"> <BsDot />  {item.issue.title} </h3>
                      <span className={`p-2 px-4 rounded-3xl bg-[#ECFDF3]`}> {item.issue.count} </span>
                    </div>
                  })
                } */}

            </div>

            {
        <div className="flex flex-col col-span-2 gap-4 ">
        <div className="border shadow-sm overflow-auto rounded-md w-full h-full ">
          <div className="flex gap-6 w-full p-4 py-8 items-center font-semibold text-[#101828] text-lg">
            <h2 className=" font-semibold"> Issue title: </h2>
            <h3 className="">{currentCategoryDetail?.title} </h3>
          </div>
          <div className="overflow-auto h-[30vh] ">
            <table className="w-full text-left ">

              <thead className="bg-[#EAECF0] h-14 text-sm font-normal">
                <tr>
                  <th className="p-2 pl-4"> URL </th>
                  <th className="p-2"> Page depth </th>
                  <th className="p-2"> Internal links </th>
                  <th className="p-2"> Status code </th>
                  <th className="p-2"> Indexable </th>
                </tr>
              </thead>
              <tbody className="overflow-auto h-40 p-2 w-full">
              
                 
                  {currentCategoryDetail?.titleItems[0].pageData.rows.map((item,i)=> {
                    return (
                      <tr key={i} className="px-2 space-y-1 border-y">

                        <td className="px-2 pl-4 space-y-1"> {item.website} </td>
                        <td className="px-2"> {item.crawlDepth} </td>
                        <td className="px-2"> {item.url} </td>
                        <td className="px-2"> {item.httpStatusCode} </td>
                        <td className="px-2"> {item.index_status} </td>
                      </tr>
                    )
                  } )} 
                
              
               
               
               
              </tbody>


            </table>
          </div>
        </div>
        <div className="border shadow-sm flex flex-col gap-4  rounded-md w-full p-4 2xl:p-4">
          <h2 className=" font-semibold text-[#344054] text-2xl ">Issue Description </h2>
          <p className="">
            {currentCategoryDetail?.description}
          </p>
        </div>

      </div>
      }

          </section>
        }
      </main>

    </>
  );
}
