"use client"
import { Fragment, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import PlainButton from "@/app/component/PlainButton"
import { CiSettings, CiShare2 } from "react-icons/ci"
import Overview from './components/Overview'
import Crawlability from './components/Crawlability'
import SitePerformance from './components/SitePerformance'
import Issues from './components/Issues'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import moment from 'moment'
import ApiCall from '@/app/utils/apicalls/axiosInterceptor'
import { useDispatch } from 'react-redux'
import { fetchTechnicalSEOFailure, setTechnicalSeo } from '@/redux/features/technicalSeoSlice'
import { fetchPerformanceFailure, fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice'
import { removeTrailingSlash } from '@/app/utils/RemoveSlash'



export default function TechnicalSeoLayout() {
    const [mobile, setMobile] = useState(true)
    const [loading, setLoading] = useState(false)

    
    const techSeo = useSelector((state: RootState)=> state.technicalSeo.metrics)
    const activeProperty = useSelector((state: RootState)=> state.property.activeProperty);
    const dispatch = useDispatch();



    const FetchTechnicalSeo = async (page?: string) => {
        try {
            // setLoading(true); 
            await ApiCall.get('/crawl/technical-seo', {
                params: {
                    limit: 100,
                    platform:'desktop',
                    url: removeTrailingSlash(activeProperty),
                    page: page
                }
            }).then((res) => dispatch(setTechnicalSeo(res.data)));
        } catch (error:any) {
            dispatch(fetchTechnicalSEOFailure(error.message));
        } finally {
            // setLoading(false);
        }
    };

useEffect(()=> {
    FetchTechnicalSeo()
} ,[activeProperty, techSeo])
    



const tabs = [
    { title: "Overview", content: <Overview /> },
    { title: "Crawlability and indexability", content: <Crawlability /> },
    { title: "Site performance", content: <SitePerformance /> },
    { title: "Issues", content: <Issues /> },
        // { title: "Internal linking", content: <InternalLinking /> },
        // { title: "Crawl comparisons", content: <CrawlComparison /> },
        // { title: "Audit history", content: <AuditHistory /> },
    ]
const CrawlTechnicalSeo = async ()=> {
    try {
        setLoading(true)
        await ApiCall.get('/crawl/technical/mini-crawler', {
            params: {
                url: activeProperty,
                timeout: 5
            }})
    } catch (error) {
        console.log(error)
    } finally {
       
    }
}




    return (
        <section className={`flex w-full h-full justify-start flex-col gap-2 overflow-y-clip `}>
            <div className="flex w-full justify-between items-center">
                <div className="w-full">
                    <h2 className=" font-semibold text-[#101828] text-3xl"> Technical SEO</h2>
                </div>
                <div className="flex w-full md:w-1/2 items-center justify-end gap-2 md:gap-4">
                    <span className="">
                        <button className='rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500' onClick={()=> CrawlTechnicalSeo()} >
                            { loading ? 'Loading...' :     ' Re-run audit'  }
                        </button>
                    </span>
                    <span className=''>
                        <PlainButton moreClass="text-primary bg-[#EFF8FF]" title="Share" icon={<CiShare2 />} />
                    </span>
                    <span className="p-2 rounded-md border cursor-pointer "><CiSettings /></span>
                </div>
            </div>
            <div className='flex items-center gap-4 my-2'>
                    <div className="flex items-center gap-2 bg-[#D0D5DD] rounded-md p-1">
                        <span className={`cursor-pointer p-2 text-white ${mobile ? 'text-white' : "bg-[#1570EF] rounded-lg"}`} onClick={() => setMobile(false)}> Desktop</span>
                        <span className={` cursor-pointer p-2 text-white font-semibold ${!mobile ? 'text-white' : "bg-[#1570EF] rounded-lg"}`} onClick={() => setMobile(true)}> Mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className=" font-semibold"> Last Update:</p>
                        <p className=""> 20th April, 2024 </p>

                    </div>
                </div>
            <Tab.Group>
                <Tab.List className="flex gap-4 w-full" >
                    {
                        tabs.map((tab) => {
                            return (
                                <div key={tab.title} >
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            /* Use the `selected` state to conditionally style the selected tab. */

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
                {/* <p> Here goes the rest</p> */}
                
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
    )
}
