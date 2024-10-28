"use client";
import TitleShareSettingTop from "@/app/component/TitleShareSettingTop";
import ToggleMobile from "../components/ToggleMobile";
import CountryPick, { Country } from "../rank-tracker/components/CountryPick";
import SearchEnginePick from "../rank-tracker/components/SearchEnginePick";
import { Fragment, useEffect, useState } from "react";
import KeywordGap, { KeywordGapType } from "./components/KeywordGap";
import LinkGap from "./components/LinkGap";
import { Tab, TabPanels, TabGroup, TabList, TabPanel } from "@headlessui/react";
import FilledButton from "@/app/component/FilledButton";
import toast from "react-hot-toast";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { countries } from "@/app/component/data/countries";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import { trimDomain } from "@/app/utils/trimDomain";
import { useQuery } from "@tanstack/react-query";
import { keywordGapData } from "./components/competitorAnalysis";

interface competitorDomains {
  target: string;
  target1: string;
  target2: string;
  location_code: number | null;
  language_code: string;
}
export default function page() {
  const [mobile, setMobile] = useState(true);
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [competitorDomains, setCompetitorDomains] = useState<competitorDomains>(
    {
      target: "",
      target1: "",
      target2: "",
      location_code: null,
      language_code: "",
    }
  );
  // const [current, setCurrent] = useState({
  //   id: "",
  //   domain: ""
  // })
  const [country, setCountry] = useState<Country | null>(null);
  const activeProperty = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );

  const { data } = keywordGapData();

  // const handleToggleMobile = () => {
  //   setMobile(!mobile);
  // };

  // const {data: linkGap} = competitorAnalysisData("linkGap");
  // console.log("LINK", linkGap)

  const currentRoute: KeywordGapType[] =
    data?.project?.crawlings[0]?.crawlingData[0]?.data?.items;
  const prevRoute: KeywordGapType[] =
    data?.project?.crawlings[1]?.crawlingData[0]?.data?.items;

  let stage = 1;

  const tabs = [
    {
      title: "Keyword gap",
      content: <KeywordGap data={currentRoute ?? []} prev={prevRoute ?? []} />,
    },
    { title: "Link gap", content: <LinkGap /> },
  ];

  // console.log("DOM", trimDomain(activeProperty.domain))
  // const property = CurrentProperty()

  const handleSubmitAnalyzeCompetitor = async () => {
    const { target1, target2, location_code, language_code } =
      competitorDomains;
    // console.log("PAY", current)
    try {
      // if (
      //   target.trim() === "" ||
      //   target2.trim() === "" ||
      //   target3.trim() === ""
      // ) {
      //   toast.error("Please enter all competitor domains");
      //   return;
      // }
      if (location_code === null) {
        toast.error("Please select a country");
        return;
      }
      if (language_code === "") {
        toast.error("Please select a language");
        return;
      }

      if (!activeProperty.id) {
        toast.error("project(url) must be selected");
        return;
      }
      // console.log("PROP", property)

      setStatus("loading");
      const response = await ApiCall.post(
        `/user/crawler/competitor-analysis/${activeProperty?.id}`,
        [
          {
            target: trimDomain(activeProperty && activeProperty?.domain),
            target1: removeTrailingSlash(target1),
            target2: removeTrailingSlash(target2),
            location_code: 2840,
            language_code: "en",
          },
        ]
      );

      const result = await response.data;
      // stage = 1;
      setStatus("success");
      toast.success("Crawl Completed!");
      setTimeout(() => {
        stage = 1;
      }, 4000);
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.message);
      console.log(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    // setCurrent({
    //   id: property?.id?.toString(),
    //   domain: property?.domain
    // })
    if (country) {
      setCompetitorDomains((prevDomains) => ({
        ...prevDomains,
        language_code: "GB",
        location_code: 2826,

        // this code is correct, don't remove.
        // ...countries.reduce(
        //   (acc, location) => {
        //     if (location.location_name === country.name.common) {

        //       acc.language_code = location.country_iso_code;
        //       acc.location_code = location.location_code;

        //     }
        //     return acc;
        //   },
        //   { language_code: "", location_code: 0 }
        // ),
      }));
    }
  }, [country, activeProperty]);

  return (
    <div className="w-full flex flex-col py-6">
      {stage === 1 ? (
        <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20">
          <TitleShareSettingTop title="Competitor analysis " />
          <section className={`flex items-center gap-3`}>
            {/* <ToggleMobile mobile={mobile} setMobile={handleToggleMobile} /> */}
            <CountryPick />
            <SearchEnginePick />
          </section>
          <section className={``}>
            <TabGroup>
              <TabList className="flex gap-4 w-full">
                {tabs.map((tab) => {
                  return (
                    <div key={tab.title}>
                      <Tab as={Fragment}>
                        {({ selected }) => (
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
              </TabList>
              <hr className="w-full" />
              <div className={` h-full w-full overflow-auto`}>
                <TabPanels>
                  {tabs.map((tab) => {
                    return (
                      <div key={tab.title} className="h-full ">
                        <TabPanel>{tab.content}</TabPanel>
                      </div>
                    );
                  })}
                </TabPanels>
              </div>
            </TabGroup>
          </section>
        </main>
      ) : (
        <section
          className={`h-full  grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20 
       `}
        >
          <h1
            className={`font-semibold min-[425px]:text-4xl 2xl:text-5xl text-3xl `}
          >
            Competitor analysis
          </h1>
          <p className="text-[#101828] font-medium text-lg 2xl:text-xl min-[425px]:w-auto min-[356px]:w-[375px] w-[320px]">
            Research your online competitors and improve your SEO
          </p>
          <div className="flex flex-col ">
            <p className="text-sm text-[#344054] font-medium my-2  min-[425px]:w-auto min-[375px]:w-[375px] w-[310px]">
              Enter up to three competitor domains and start analyzing
            </p>
            <div className="flex flex-col gap-3 sm:w-[80%] lg:w-[727px] w-[92%]">
              <input
                type="text"
                onChange={(e) =>
                  setCompetitorDomains({
                    ...competitorDomains,
                    target1: e.target.value,
                  })
                }
                className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border  w-full"
                placeholder="e.g domain1.com"
              />
              <input
                type="text"
                onChange={(e) =>
                  setCompetitorDomains({
                    ...competitorDomains,
                    target2: e.target.value,
                  })
                }
                className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border w-full"
                placeholder="e.g domain2.com"
              />
              {/* <input
                type="text"
                onChange={(e) =>
                  setCompetitorDomains({
                    ...competitorDomains,
                    target3: e.target.value,
                  })
                }
                className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border w-full"
                placeholder="e.g domain3.com"
              /> */}
              <div className="flex flex-col min-[425px]:flex-row sm:items-center items-start gap-4 sm:gap-8 w-full">
                <CountryPick setCountry={setCountry} className="w-full" />
                <span className="w-full min-[425px]:w-auto ">
                  <FilledButton
                    className="whitespace-nowrap w-full"
                    disabled={status === "loading"}
                    loading={status === "loading"}
                    handleClick={handleSubmitAnalyzeCompetitor}
                    title={"Analyze competitors"}
                  />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
