import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle";
import SubHead from "./(technicalseo)/SubHead";
import { GoDotFill } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Title } from "./Overview";
import { BarChartSingle } from "./(technicalseo)/BarChartSingle";
import DualProgressBar from "./(technicalseo)/DualProgressBar";

export default function Crawlability() {
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
            <BarChartSingle />

          </div>
        </section>
      </section>
      <section className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
        
        
        
        
        
        
        <div className="grid p-2 md:p-4 col-span-1 h-full md:h-[348px] justify-items-start  rounded-md w-full border ">

          <Title title="Indexability" />
          <div className="grid w-full  ">
            <DualProgressBar leftPercentage={20} />
            <div className="flex h-full flex-col justify-end">
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-300"><GoDotFill />  </span> Crwaled(20,220) </p>
              <p className=' flex items-center text-xs text-[#475467]'> <span className="text-green-100"><GoDotFill /></span> Uncrawled(4,000) </p>
            </div>
          </div>
        </div>







        <section className="w-full grid col-span-2 h-full  md:h-[348px] border rounded-md p-6">
          <Title title="Pages not indexed by search engines" />
          <div className=" h-full w-full ">
            <BarChartSingle />

          </div>
        </section>
      </section>
    </main>
  )
}
