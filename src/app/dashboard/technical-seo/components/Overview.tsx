import { RxQuestionMarkCircled } from "react-icons/rx"
import { ReusableProgressiveCircle } from "./(technicalseo)/ReusableProgressiveCircle"
import SubHead from "./(technicalseo)/SubHead"
import PieChart from "./(technicalseo)/PieChart";

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
function Overview() {
  const EachItem = ({ title }: ItemProps) => {
    return (
      <section className="grid gap-3 md:gap-6 h-full">
        <h1 className={`text-[#101828] flex text-sm font-semibold items-center gap-2`}>
          {title}
          <RxQuestionMarkCircled />
        </h1>
        <PieChart data={data} />
      </section>
    )
  }
  return (
    <main className="pb-14 grid w-full">
      <section className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
        <div className=" w-full col-span-1 h-full md:h-[464px]  border rounded-md p-6">
          <ReusableProgressiveCircle title="Site health" val={30} pageTitle={"Site health"} />
        </div>
        <section className=" col-span-3 h-full md:h-[464px] border rounded-md p-6">
          <SubHead title="Core web vitals" />
          <div className="grid grid-col-1 md:grid-cols-3 py-6">
            <EachItem title="Largest Contentful Paint (LCP)" />
            <EachItem title="Total Blocking Time (TBT)" />
            <EachItem title="Cumulative Layout Shift (CLS)" />

          </div>
        </section>
      </section>
    </main>
  )
}

export default Overview