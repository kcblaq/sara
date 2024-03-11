
import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import FilledButton from '../component/FilledButton'
import Card from './Card';
import { Line } from "react-chartjs-2";
import ChangeLineChart from '../component/charts/bars';

export default function Dashboard() {
  return (
    <section className='py-12 grid h-full overflow-clip '>
      <div className="flex h-32 w-full flex-col md:flex-row justify-between items-start flex-grow">
        <div className='flex flex-col'>
          <h1 className="text-2xl text-[#101828] font-semibold">Welcome back, John</h1>
          <p>Track, manage and boost your site’s SEO.</p>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <button className='w-full gap-2 border rounded-lg text-base p-3 flex items-center text-[#344054] font-semibold'>
              <CiShare2 /> Share
            </button>
          </span>
          <span>
            <FilledButton title="View recommendations" />
          </span>
        </div>
      </div>

      <section className=" h-full overflow-auto">

      <div className="grid items-center grid-cols-1 md:grid-cols-3 pt-8 gap-2 overflow-scroll justify-between">
        <Card title='Organic trafic' date='Jan, 24' amount='2.5M' style='text-red-500' percent='10%' chart={<ChangeLineChart data1={0} data2={10} data3={50} data4={4} />}  />
        <Card title='Organic trafic' date='Jan, 24' amount='1.5M' style='text-green-500' percent='40%' chart={<ChangeLineChart data1={100} data2={10} data3={0} data4={41} />} />
        <Card title='Organic trafic' date='Jan, 24' amount='500K' style='text-green-500' percent='25%' chart={<ChangeLineChart data1={0} data2={0} data3={0} data4={400}/>}   />
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 items-center mt-8 ">
        <div className={`h-[480px] max-w-[328px] border p-2 md:p-6 rounded-md `}>
          <h1 className=""> Overall SEO score</h1>
        </div>

        <div className={`max-w-[861px] border h-[480px] rounded-md p-2 md:p-6 `}>
          <h1 className="">Traffic overview</h1>
        </div>
        <p > Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam corrupti earum eveniet commodi! Dolores dignissimos rem delectus, id atque illo culpa reiciendis reprehenderit sint commodi quas sapiente perferendis magni repudiandae voluptas praesentium rerum modi veniam quod est! Sunt illum rem ipsa tempora reiciendis veniam molestias. Cum delectus quo at vel veritatis assumenda et amet, hic officia facilis quisquam commodi labore, eaque eveniet nesciunt sequi a officiis! Sed omnis laboriosam reprehenderit, provident ut totam, eum delectus eaque, quam possimus iusto distinctio debitis explicabo error nesciunt velit molestias temporibus sit illo! Perferendis eligendi error ad magni tenetur commodi! Alias magni, odit id molestias cupiditate, ipsam nemo quos officia modi et asperiores, ipsa vero nulla commodi aperiam. Deserunt dolorum, nobis amet voluptatem ducimus similique nisi recusandae officiis dicta? Magnam culpa impedit adipisci quas repudiandae, beatae sed necessitatibus, illo ullam illum, quis odio error placeat repellendus corporis! Deleniti eaque quis qui ut labore. Facere id qui laboriosam magnam accusantium error hic non at fugit eveniet veniam, praesentium facilis nam necessitatibus libero architecto voluptas. Quia deserunt sunt fuga dolorum cupiditate debitis sequi ipsam, temporibus quidem, repudiandae aspernatur consequatur adipisci molestias? Vel itaque, est quibusdam, accusamus commodi maxime asperiores modi provident eos temporibus, fugit a! Illo expedita provident aspernatur velit nesciunt quis blanditiis dolorum labore. Itaque, ipsum. Doloremque aspernatur porro tenetur amet neque aliquam inventore commodi quae dolor voluptatibus nesciunt id alias blanditiis maxime, veritatis reiciendis a illum sed dolorem deleniti? Ab temporibus dolor voluptatum incidunt ducimus at quibusdam! Repudiandae dicta quasi molestias impedit excepturi ea sint ratione accusantium sunt, iusto ullam accusamus tempore adipisci? Fuga molestiae blanditiis neque quis qui maiores, adipisci, suscipit vitae repudiandae esse eligendi ipsa natus magni sequi asperiores magnam officiis vel assumenda iure, cumque debitis culpa sed! Eligendi id velit aliquam nemo ipsum dicta ex ad facere, ducimus rerum, sequi esse delectus eum accusamus exercitationem qui cum quibusdam. Dolorum, voluptates culpa nam odio adipisci id ut iusto eum? Quas facere laborum ipsum id ducimus unde assumenda odit pariatur dolorem. Iusto accusantium rem consequuntur maiores quisquam esse id voluptatum aut, libero, quam tenetur harum sequi provident corrupti dolore repellat inventore neque ratione reprehenderit aspernatur magnam quis quos. Et nostrum odit eveniet modi! Voluptate dolorem, repellat cumque autem laborum tempora! Labore, similique tempora quo neque impedit iusto rem harum error autem placeat corrupti iure modi, minus at ipsam voluptates temporibus. Reprehenderit tempora cumque et quas voluptatibus in porro consequatur, blanditiis maxime quibusdam! Saepe culpa odit illo itaque unde, excepturi quibusdam nostrum ullam officia esse tempore, repellendus laboriosam asperiores minus nemo quae suscipit ut debitis, modi nesciunt? Ab unde exercitationem, temporibus rem ut iste, nemo atque vitae tempore nihil cum eveniet eos. Aliquid doloribus porro aspernatur atque asperiores optio animi quo, commodi quasi fugiat. Ab dolorem, placeat, nostrum necessitatibus qui id nihil odit excepturi tempora at labore sunt vel alias totam maiores dolores vitae odio minus, eum molestiae quidem ullam! Repellat aliquam natus commodi! Deserunt velit est rem illo. Recusandae quaerat, ea qui tempore voluptas fuga adipisci ex ab autem. Minima, voluptas facilis? Tempora? </p>

      </div>
      </section>
    </section>


  )
}
