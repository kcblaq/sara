import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle";
import SubHead from "./(technicalseo)/SubHead";
import { GoDotFill } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Title } from "./Overview";
import DualProgressBar from "./(technicalseo)/DualProgressBar";
import BarChartSingle from "./(technicalseo)/BarChartSingle";
import { AnotherDoughnutChart } from "./(technicalseo)/DoughnutChart";

export default function Crawlability() {

  const labels = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August','September'];
const mockData = [100, 300, 100, 200, 500,900, 100, 200, 800, 900];

  const crawldepthlabels = ['1', '2', '3', '4+'];
const crawldepthLabelData = [100, 300, 100, 800, ];

const indexibilitData = [600,300,200,900, 700]
const indexibilityLabel = ["X-Robots tags", "'non-index' metatag", "Robots.txt", "Non canonical pages", "Non 200 status"]
  return (
    <main className="pb-14 grid w-full gap-8">


      <section className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">

          <Title title="Crawl status" />
          <div className="p-4 flex w-full  ">
            <CircularProgressbarWithChildren value={79} className='h-48' styles={{
              path: { stroke: `green` }
            }} >
              <div className="flex flex-col">
                <p className='text-gray-600 text-center text-sm'> Total links found </p>
                <p className='text-gray-900 text-center text-5xl'> 79% </p>
              </div>
            </CircularProgressbarWithChildren>
            <div className="flex h-full flex-col justify-end">
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-300"><GoDotFill />  </span> Crwaled(20,220) </p>
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-100"><GoDotFill /></span> Uncrawled(4,000) </p>
            </div>
          </div>
        </div>

        <section className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <div className="flex flex-col w-full">
            <h1 className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}>
              Crawled pages
              <RxQuestionMarkCircled />
            </h1>
            <hr className='mt-2 w-full' />
          </div>
          <div className=" h-full w-full ">
            <BarChartSingle labels={labels} data={mockData} backgroundColor="#53B1FD" />

          </div>
        </section>
      </section>
      <section className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>






        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">

          <Title title="Indexability" />
          <div className="grid w-full gap-4 justify-items-center  ">
            <p className="text-center font-semibold">Crawled pages: 2,433 </p>
            <div className="flex flex-col w-full gap-2">
              <DualProgressBar leftPercentage={'90%'} />
              <div className="flex justify-between w-full items-center">
                <p className=""> 40%</p>
                <p className=""> 60%</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <p className=" text-xs flex items-center text-[#475467]">  <span className='text-green-400'><GoDotFill /> </span> Indexable (5932) </p>
            <p className=" text-xs flex items-center text-[#475467]">  <span className='text-orange-400'><GoDotFill /> </span> Non indexable (59) </p>

            </div>
          </div>
        </div>



        <section className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <Title title="Pages not indexed by search engines" />
          <div className=" h-full w-full ">
            <BarChartSingle labels={indexibilityLabel} data={indexibilitData} backgroundColor="red" xAxisLabel="Blocked by" />

          </div>
        </section>
      </section>
      <section className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>

        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">

          <Title title="HTTP status codes" />
          <div className="grid w-full gap-4 justify-items-center  ">
            
          <div className="p-4 flex gap-2 h-48">
            <AnotherDoughnutChart />
            <div className="flex flex-col justify-end">
              <p className=" text-xs flex items-center text-[#475467]">  <span className='text-green-400'><GoDotFill /> </span> Info - 1xx (59) </p>
              <p className=" text-xs flex items-center text-[#475467]">  <span className='text-green-600'><GoDotFill /> </span> Success - 1xx (59) </p>
              <p className=" text-xs flex items-center text-[#475467]">  <span className='text-orange-400'><GoDotFill /> </span> Redirect - 1xx (59) </p>
              <p className=" text-xs flex items-center text-[#475467]">  <span className='text-red-400'><GoDotFill /> </span> Client error - 1xx (59) </p>
              <p className=" text-xs flex items-center text-[#475467]">  <span className='text-red-200'><GoDotFill /> </span> Server error - 1xx (59) </p>
            </div>
          </div>
          </div>
        </div>



        <div className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <Title title="Page crawl depth" />
          <div className=" h-full w-full ">
            <BarChartSingle labels={crawldepthlabels} data={crawldepthLabelData} backgroundColor="#53B1FD" xAxisLabel="Number of clicks" />

          </div>
        </div>
      </section>
    </main>
  )
}
