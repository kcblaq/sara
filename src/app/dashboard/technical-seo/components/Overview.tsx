import { RxQuestionMarkCircled } from "react-icons/rx"
import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle"
import SubHead from "./(technicalseo)/SubHead"
import PieChart from "./(technicalseo)/PieChart";
import { FaCircle } from "react-icons/fa6";
import  { AnotherDoughnutChart } from "./(technicalseo)/DoughnutChart";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { GoDotFill } from "react-icons/go";
import PlainButton from "@/app/component/PlainButton";
import FilledButton, { ButtonFilled } from "@/app/component/FilledButton";
import { FiDownloadCloud } from "react-icons/fi";
import TableItems from "./(technicalseo)/TableItems";

interface ItemProps {
  title: string;
}

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const Title = ({ title, info }: { title: string, info: string }) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}>
        {title}
       <button title={info}>  <RxQuestionMarkCircled /></button>
      </h1>
      <hr className='mt-2 w-full' />
    </div>
  )
}
function Overview() {
  const EachItem = ({ title }: ItemProps) => {
    return (
      <section className="grid gap-3 md:gap-6 justify-center h-full">
        <h1 className={`text-[#101828] flex text-sm font-semibold items-center gap-2`}>
          {title}
          <RxQuestionMarkCircled />
        </h1>
        <div className="flex w-40">
          <PieChart data={data} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-red-500 text-xs' />
            <p className=' font-normal'> Low</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-yellow-500 text-xs' />
            <p className=' font-normal'> Moderate</p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <FaCircle className='text-green-500 text-xs' />
            <p className=' font-normal'> High</p>
          </div>
        </div>
      </section>
    )
  }

 
  return (
    <main className="pb-14 grid w-full gap-8 z-0">
      <section className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
        <div className=" w-full col-span-1 h-full md:h-[464px]  border rounded-md p-6">
          <ReusableProgressiveCircle title="Site health" info="The overall site health rating" val={30} pageTitle={"Site health"} />
        </div>
        <section className="w-full col-span-3 h-full md:h-[464px] border rounded-md p-6">
          <SubHead title="Core web vitals" info="These are a set of specific factors that Google considers important in assessing the user experience of a web page" />
          <div className="grid w-full items-center justify-between grid-col-1 md:grid-cols-3 py-6">
            <EachItem title="Largest Contentful Paint (LCP)" />
            <EachItem title="Total Blocking Time (TBT)" />
            <EachItem title="Cumulative Layout Shift (CLS)" />

          </div>
        </section>
      </section>
      <section className="grid gap-4 justify-items-stretch  w-full grid-cols-1 md:grid-cols-3">
        <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start  rounded-md w-full border ">

          <Title title={"Crawl status"} info="The status of the crawl result" />
          <div className="p-4 flex w-full">
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
        <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start  rounded-md w-full border ">
          <Title title="HTTP status codes" info="The returned code status that indicate what the response is" />
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
        <div className="grid p-2 md:p-4 col-span-1 h-[308px] justify-items-start rounded-md w-full border ">
          <Title title="Site issues" info="All issues associated with thw website" />
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

      </section>
      <section className="w-full grid border rounded-md min-w-[200px] max-w-[900px] ">
        <div className=" flex items-center justify-between">
          <div className="flex w-full p-2 md:p-4 items-center justify-between">
            <h1 className={`text-[#101828] gap-3 flex items-center font-semibold text-xl`}>
              Top issues
              <RxQuestionMarkCircled />
            </h1>
            <div className="flex items-center gap-2 md:gap-4">

              <div className="flex">
                <PlainButton title="View all issues" />
              </div>
              <div className="flex">
                <FilledButton icon={<FiDownloadCloud />
                } title="Export issues" handleClick={function (): void {
                  throw new Error("Function not implemented.");
                }} />
              </div>

            </div>
          </div>
          <hr />
        </div>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full border-collapse">
            <thead className="p-4">
              <tr className="bg-[#EAECF0] p-4 font-medium text-start">
                <th className="border text-xs text-[#475467] text-start border-[#c0c2c5] p-2" colSpan={2}>Issues</th>
                <th className="border text-xs text-[#475467 text-start] text-start border-[#c0c2c5] p-2">Affected Pages</th>
                <th className="border text-xs text-[#475467] text-start border-[#c0c2c5] p-2">Fixed</th>
                <th className="border text-xs text-[#475467] text-start border-[#c0c2c5] p-2">New</th>
              </tr>
            </thead>
            <tbody>
            <tr className=" p-2 font-medium">
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]" colSpan={2}>
                  <TableItems />
                </td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">456</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">23</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">2</td>
              </tr>
            <tr className=" p-2 font-medium">
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]" colSpan={2}>
                  <TableItems />
                </td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">456</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">23</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">2</td>
              </tr>
            <tr className=" p-2 font-medium">
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]" colSpan={2}>
                  <TableItems />
                </td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">456</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">23</td>
                <td className="border text-xs text-[#475467] p-2 border-[#c0c2c5]">2</td>
              </tr>
            
            
            </tbody>
          </table>
        </div>

      </section>
    </main>
  )
}

export default Overview