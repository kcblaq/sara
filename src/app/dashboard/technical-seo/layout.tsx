"use client";
import { Fragment, Suspense, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import PlainButton from "@/app/component/PlainButton";
import { CiSettings, CiShare2 } from "react-icons/ci";
import Overview from "./components/Overview";
import Crawlability from "./components/Crawlability";
import SitePerformance from "./components/SitePerformance";
import Issues from "./components/Issues";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import moment from "moment";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useDispatch } from "react-redux";
import {
  // fetchTechnicalSEOFailure,
  setTechnicalSeo,
} from "@/redux/features/technicalSeoSlice";
import {
  fetchPerformanceFailure,
  fetchPerformanceSuccess,
} from "@/redux/features/performanceMetric slice";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useTechnicalSeoFetchData } from "@/app/services/technicalSeo/TechnicalSeoFetch";

export default function TechnicalSeoLayout() {
  const [mobile, setMobile] = useState(true);
  const [loading, setLoading] = useState(false);

  // const techSeo = useSelector((state: RootState) => state.technicalSeo.metrics);
  const lastUpdated = useSelector(
    (state: RootState) =>
      state.performance.metrics?.history?.scores[0]?.createdAt
  );
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );
  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );
  const dispatch = useDispatch();

  // const FetchTechnicalSeo = async (page?: string) => {
  //     try {
  //         await ApiCall.get('/crawl/technical-seo', {
  //             params: {
  //                 limit: 100,
  //                 platform: 'desktop',
  //                 url: removeTrailingSlash(activeProperty),
  //                 page: page
  //             }
  //         }).then((res) => dispatch(setTechnicalSeo(res.data)));
  //     } catch (error: any) {
  //         dispatch(fetchTechnicalSEOFailure(error.message));
  //     } finally {
  //         // setLoading(false);
  //     }
  // };

  // useEffect(() => {
  //     FetchTechnicalSeo()
  // }, [activeProperty,])

  const tabs = [
    { title: "Overview", content: <Overview /> },
    { title: "Crawlability and indexability", content: <Crawlability /> },
    { title: "Site performance", content: <SitePerformance /> },
    { title: "Issues", content: <Issues /> },
    // { title: "Internal linking", content: <InternalLinking /> },
    // { title: "Crawl comparisons", content: <CrawlComparison /> },
    // { title: "Audit history", content: <AuditHistory /> },
  ];
  const CrawlTechnicalSeo = async () => {
    try {
      setLoading(true);

      // await Promise.all([
      //   ApiCall.get("/crawl/webcrawler", {
      //     params: {
      //       url: removeTrailingSlash(activeProperty),
      //       type: "passive",
      //     },
      //   }),
      //   ApiCall.get("/crawl/technical/mini-crawler", {
      //     params: {
      //       url: removeTrailingSlash(activeProperty),
      //       timeout: 5,
      //     },
      //   }),
      // ]);
      const response = await ApiCall.post(
        `/user/crawler/technical-seo/${activePropertyObj.id}`
      );
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchTechseoData = async () => {
  //   const result = await ApiCall.get(
  //     `/user/crawler/technical-seo/${activePropertyObj?.id}`

  //   );
  //   console.log("tech seo", result.data);
  //   dispatch(setTechnicalSeo(result.data));
  //   return result;
  // };
  // const { data, isLoading } = useQuery({
  //   queryKey: ["techseodata"],
  //   queryFn: fetchTechseoData,
  // });

  const { isLoading } = useTechnicalSeoFetchData();

  // console.log(activePropertyObj);

  return (
    <section className={`flex w-full h-full justify-start flex-col gap-2 `}>
      <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center gap-2">
        <div className="w-fit">
          <h2 className=" font-semibold text-[#101828] sm:text-3xl text-2xl">
            Technical SEO
            {/* {JSON.stringify(activePropertyObj.id)} */}
          </h2>
        </div>
        <div className="flex w-fit md:w-1/2 items-center justify-end gap-2 md:gap-4">
          <span className="">
            <button
              className="rounded-lg sm:text-base text-sm p-2 bg-primary text-white font-semibold hover:bg-blue-500"
              onClick={() => CrawlTechnicalSeo()}
            >
              {loading ? "Crawling..." : " Re-run audit"}
            </button>
          </span>
          <span className="">
            <PlainButton
              moreClass="text-primary bg-[#EFF8FF] sm:text-base text-sm"
              title="Share"
              icon={<CiShare2 />}
            />
          </span>
          <span className="p-2 rounded-md border cursor-pointer ">
            <CiSettings />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 my-2">
        {/* <div className="flex items-center min-[375px]:text-sm text-xs gap-2 bg-[#D0D5DD] rounded-md p-1">
          <span
            className={`cursor-pointer p-2 text-white ${
              mobile ? "text-white" : "bg-[#1570EF] rounded-lg"
            }`}
            onClick={() => setMobile(false)}
          >
            {" "}
            Desktop
          </span>
          <span
            className={` cursor-pointer p-2 text-white font-semibold ${
              !mobile ? "text-white" : "bg-[#1570EF] rounded-lg"
            }`}
            onClick={() => setMobile(true)}
          >
            {" "}
            Mobile
          </span>
        </div> */}
        <div className="flex items-center gap-2 sm:text-base min-[375px]:text-sm text-xs">
          <p className=" font-semibold"> Last Update:</p>
          {/* {JSON.stringify(activePropertyObj)} */}
          <p className=""> {moment(lastUpdated).format("Do MMM YY")} </p>
        </div>
      </div>

      <Tab.Group className="">
        <Tab.List className="flex gap-4 w-full overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => {
            return (
              <div key={tab.title}>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    /* Use the `selected` state to conditionally style the selected tab. */

                    <p
                      className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${
                        selected
                          ? "text-primary border-b-2 border-primary"
                          : " text-[#667085] active:border-none"
                      }`}
                    >
                      {tab.title}
                    </p>
                  )}
                </Tab>
              </div>
            );
          })}
        </Tab.List>

        {/* <p> Here goes the rest</p> */}

        <div className={` h-full w-full overflow-auto`}>
          {isLoading ? (
            <div className=""> Loading... </div>
          ) : (
            <Tab.Panels>
              {tabs.map((tab) => {
                return (
                  <div key={tab.title} className="h-full overflow-auto">
                    <Tab.Panel>{tab.content}</Tab.Panel>
                  </div>
                );
              })}
            </Tab.Panels>
          )}
        </div>
      </Tab.Group>
    </section>
  );
}
