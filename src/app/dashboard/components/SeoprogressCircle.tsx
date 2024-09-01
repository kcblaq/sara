import { RootState } from "@/app/store";
import { FC } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { Title } from "../technical-seo/components/Overview";
import { BiUpArrowAlt } from "react-icons/bi";

const SEOProgressiveCircle: FC = () => {
  const metrics = useSelector((state: RootState) => state.performance.metrics);
  const scores = metrics?.history?.scores[0]?.performance || null;

  const averageSeo = scores && scores * 100;

  return (
    <div className="z-0">
      <CircularProgressbarWithChildren
        value={averageSeo ?? 0}
        className=""
        styles={{
          path: {
            stroke:
              averageSeo && averageSeo < 40
                ? "#D92D20"
                : averageSeo && averageSeo > 40 && averageSeo < 70
                ? "#FDB022"
                : "#039855",
          },
        }}
      >
        <div className="flex flex-col">
          <p className="text-gray-600 text-center text-sm"> Health score</p>
          <p className="text-gray-900 text-center text-3xl lg:text-5xl">
            {" "}
            {averageSeo?.toFixed(0)}%{" "}
          </p>
          <p className="text-[#027A48] inline-flex items-center justify-center lg:mt-4 mt-2 gap-0.5 text-sm">
            <BiUpArrowAlt className="text-lg" />
            12
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default SEOProgressiveCircle;

export const CrawledPages: FC = () => {
  const crawled = useSelector((state: RootState) => state.technicalSeo.metrics);

  const scores = crawled?.crawled || null;

  const averageSeo = scores && scores.crawled;
  const total = crawled?.crawled?.total ?? 0;

  return (
    <div className="rounded-full w-full h-fit flex items-center justify-center ">
      <div className="z-0">
        {/* <CircularProgressbarWithChildren value={averageSeo ?? 0} className='' styles={{
          path: { stroke: averageSeo && averageSeo < 40 ? "#D92D20" : averageSeo && averageSeo > 40 && averageSeo < 70 ? "#FDB022" : "#039855" }
        }} >
          <div className="flex flex-col">
            <p className='text-gray-600 text-center text-sm'>Total links found </p>
            <p className='text-gray-900 text-center text-5xl'> {total} </p>
          </div>
        </CircularProgressbarWithChildren> */}
        <CircularProgressbarWithChildren
          value={averageSeo ?? 0}
          className="lg:size-full size-[200px]"
          styles={{
            trail: {
              stroke: "#D1FADF",
            },
            path: {
              stroke: "#12B76A",
            },
          }}
        >
          <div className="flex flex-col">
            <p className="text-gray-600 text-center text-sm">
              Total links found{" "}
            </p>
            <p className="text-gray-900 text-center text-5xl"> {total} </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export const CrawledPagesComplete: FC = () => {
  const crawled = useSelector((state: RootState) => state.technicalSeo.metrics);

  const scores = crawled?.crawled || null;

  const averageSeo = scores && scores.crawled;

  return (
    <div className="grid p-2 md:p-4 col-span-1 h-full justify-items-start  rounded-md w-full border ">
      <Title title={"Crawl status"} info="The status of the crawl result" />
      <div className="p-2 flex w-full ">
        <div className=" rounded-full flex items-center justify-center">
          <div className="z-0">
            <CircularProgressbarWithChildren
              value={averageSeo ?? 0}
              className=""
              styles={{
                trail: {
                  stroke: "#D1FADF",
                },
                path: {
                  stroke: "#12B76A",
                },
              }}
            >
              <div className="flex flex-col">
                <p className="text-gray-600 text-center text-sm">
                  Total links found{" "}
                </p>
                <p className="text-gray-900 text-center text-5xl">
                  {" "}
                  {crawled?.crawled?.total}{" "}
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>

        <div className="flex h-full flex-col justify-end">
          <p className=" flex items-center text-xs text-[#475467]">
            {" "}
            <span className="text-green-300">
              <GoDotFill />{" "}
            </span>{" "}
            {`Crwaled(${crawled?.crawled.crawled})`}{" "}
          </p>
          <p className=" flex items-center text-xs text-[#475467]">
            {" "}
            <span className="text-green-100">
              <GoDotFill />
            </span>{" "}
            {`Uncrawled(${crawled?.crawled.uncrawled})`}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
