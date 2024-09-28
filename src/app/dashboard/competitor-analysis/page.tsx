"use client";
import TitleShareSettingTop from "@/app/component/TitleShareSettingTop";
import ToggleMobile from "../components/ToggleMobile";
import CountryPick, { Country } from "../rank-tracker/components/CountryPick";
import SearchEnginePick from "../rank-tracker/components/SearchEnginePick";
import { Fragment, useEffect, useState } from "react";
import KeywordGap from "./components/KeywordGap";
import LinkGap from "./components/LinkGap";
import { Tab } from "@headlessui/react";
import FilledButton from "@/app/component/FilledButton";
import toast from "react-hot-toast";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { countries } from "@/app/component/data/countries";
import { AxiosError } from "axios";

interface competitorDomains {
  target: string;
  target2: string;
  target3: string;
  location_code: number | null;
  language_code: string;
}
export default function page() {
  const [mobile, setMobile] = useState(true);
  const [competitorDomains, setCompetitorDomains] = useState<competitorDomains>(
    {
      target: "",
      target2: "",
      target3: "",
      location_code: null,
      language_code: "",
    }
  );
  const [country, setCountry] = useState<Country | null>(null);
  console.log(competitorDomains);
  const handleToggleMobile = () => {
    setMobile(!mobile);
  };

  let stage = 0;

  const tabs = [
    { title: "Keyword gap", content: <KeywordGap /> },
    { title: "Link gap", content: <LinkGap /> },
  ];

  const handleSubmitAnalyzeCompetitor = async () => {
    const { target, target2, target3, location_code, language_code } =
      competitorDomains;
    try {
      if (
        target.trim() === "" ||
        target2.trim() === "" ||
        target3.trim() === ""
      ) {
        toast.error("Please enter all competitor domains");
        return;
      }
      if (location_code === null) {
        toast.error("Please select a country");
        return;
      }
      if (language_code === "") {
        toast.error("Please select a language");
        return;
      }

      new URL(target);

      const response = await ApiCall.post(
        `/user/crawler/competitor-analysis/${""}`,
        {
          target,
          target2,
          target3,
          location_code,
          language_code,
        }
      );
      const result = response.data;
      stage = 1;
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (country) {
      setCompetitorDomains((prevDomains) => ({
        ...prevDomains,
        ...countries.reduce(
          (acc, location) => {
            if (location.location_name === country.name.common) {
              acc.language_code = location.country_iso_code;
              acc.location_code = location.location_code;
            }
            return acc;
          },
          { language_code: "", location_code: 0 }
        ),
      }));
    }
  }, [country]);

  return stage === 1 ? (
    <main className="grid w-full h-full items-start content-start gap-6 my-10 mb-20">
      <TitleShareSettingTop title="Competitor analysis " />
      <section className={`flex items-center gap-3`}>
        <ToggleMobile mobile={mobile} setMobile={handleToggleMobile} />
        <CountryPick />
        <SearchEnginePick />
      </section>
      <section className={``}>
        <Tab.Group>
          <Tab.List className="flex gap-4 w-full">
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
          </Tab.List>
          <hr className="w-full" />
          <div className={` h-full w-full overflow-auto  `}>
            <Tab.Panels>
              {tabs.map((tab) => {
                return (
                  <div key={tab.title} className="h-full ">
                    <Tab.Panel>{tab.content}</Tab.Panel>
                  </div>
                );
              })}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </section>
    </main>
  ) : (
    <section
      className={`grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20 
        `}
    >
      <h1 className={`font-semibold text-4xl 2xl:text-5xl`}>
        {" "}
        Competitor analysis{" "}
      </h1>
      <p className="text-[#101828] font-medium text-lg 2xl:text-xl">
        {" "}
        Research your online competitors and improve your SEO
      </p>
      <div className="flex flex-col">
        <p className="text-sm text-[#344054] font-medium my-2">
          {" "}
          Enter up to three competitor domains and start analyzing
        </p>
        <div className="flex flex-col gap-3 w-[80%] lg:w-[727px]">
          <input
            type="text"
            onChange={(e) =>
              setCompetitorDomains({
                ...competitorDomains,
                target: e.target.value,
              })
            }
            className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border"
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
            className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border"
            placeholder="e.g domain2.com"
          />
          <input
            type="text"
            onChange={(e) =>
              setCompetitorDomains({
                ...competitorDomains,
                target3: e.target.value,
              })
            }
            className="py-5 p-3 focus:outline-none focus:shadow-sm rounded-md border"
            placeholder="e.g domain3.com"
          />
          <div className="flex items-center gap-8">
            <CountryPick setCountry={setCountry} />
            <span>
              <FilledButton
                handleClick={handleSubmitAnalyzeCompetitor}
                title={"Analyze competitors"}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
