import { useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function Issues() {
  const [currentFilter, setCurrentFilter] = useState('All issues')
  const tabsFilter = [
    { name: "All issues" },
    { name: "Errors", icon: <Image src={'/dashboard/error.svg'} alt="Error" width={24} height={24} /> },
    { name: "Warnings", icon: <Image src={'/dashboard/warning.svg'} alt="Warning issues" width={24} height={24} /> },
    { name: "Notices", icon: <Image src={'/dashboard/notices.svg'} alt="Notices" width={24} height={24} /> },
    { name: "Fixed", icon: <Image src={'/dashboard/fixed.svg'} alt="Fixed issues" width={24} height={24} /> },
  ];

  return (
    <main className="pb-14 grid w-full gap-8 h-full ">
      <section className="flex h-20 flex-wrap items-center justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {
            tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item.name}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"}`} onClick={() => setCurrentFilter(item.name)}>
                {item.icon && item.icon} {item.name}
              </button>
            ))
          }
        </div>
        <div className="flex">
          <div className="flex relative rounded-md w-[320px]  ">
            <input type='search' className="w-full h-full border p-3 rounded-md focus:outline-none focus:shadow-sm focus:shadow-primary pl-8 " />
            <CiSearch className=' absolute top-4 left-4 ' />

          </div>
        </div>
      </section>
      <section className=" grid grid-cols-1 gap-8 md:grid-cols-3 h-full overflow-y-auto">
        <div className="flex flex-col col-span-1 border overflow-y-auto shadow-sm rounded-md">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas vel vitae suscipit soluta. Eveniet labore laudantium mollitia neque corporis similique? Laudantium hic aut, voluptas assumenda eveniet vero sunt inventore harum sed alias expedita. Dignissimos voluptatibus totam quo labore et adipisci corrupti, dolorum rem, atque quia omnis sapiente, at voluptatem recusandae quos reiciendis exercitationem dolores itaque dolore mollitia hic eum? Quaerat ipsa possimus labore accusamus dignissimos sint quibusdam repellendus, deleniti ullam cum accusantium praesentium maxime dolorum architecto dolor odit suscipit itaque laboriosam beatae ut cumque id maiores. Temporibus rem eveniet illo id consequatur soluta similique, a voluptatum mollitia eum perferendis harum reprehenderit itaque delectus natus est. Fugiat quo, voluptatem, culpa natus, distinctio optio eligendi vitae iste velit repudiandae veniam accusantium delectus sit? Et beatae nostrum dicta? Dolorem, asperiores assumenda vitae quae sint earum fuga itaque tenetur provident delectus id, dolores aut. Iste deleniti mollitia cumque reprehenderit nulla consectetur maiores libero perspiciatis numquam, sapiente facere sunt nihil tenetur illum sit amet dolor, quasi culpa fuga aspernatur. Cupiditate saepe cumque, aliquid beatae porro fugit odit maxime? Eius perferendis dolorem est obcaecati sint quia, illo nesciunt eligendi quas placeat voluptas autem exercitationem ratione itaque sequi nisi laudantium impedit. Hic ipsum sunt nesciunt, exercitationem est aliquam veritatis magni nisi cumque itaque voluptas veniam. Dolor magnam natus amet enim iste ex nihil porro laboriosam vitae, quia atque ut? Libero dolorum facere atque adipisci doloribus et iusto, sed voluptatem minus, animi dolorem. Adipisci placeat sit vel maiores obcaecati dignissimos labore accusamus? Id voluptatem a non rem unde necessitatibus, consequatur assumenda tempore beatae laboriosam facilis suscipit, soluta perspiciatis, placeat at fugiat? Amet nam tenetur corrupti nesciunt, sed perspiciatis assumenda. Ex, natus. Voluptatum beatae rem ipsum aliquid sequi iste culpa autem? Deleniti exercitationem aspernatur ullam omnis iste libero, temporibus consequuntur rem molestias minus explicabo officiis obcaecati labore voluptates aperiam.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit accusamus fugiat cupiditate quaerat, vitae consequatur hic accusantium doloribus delectus labore deleniti fugit, earum, dolorum temporibus ad ducimus enim harum?
        </div>
        <div className="flex flex-col col-span-2 border shadow-sm rounded-md">
          Hii
        </div>
      </section>
    </main>
  );
}
