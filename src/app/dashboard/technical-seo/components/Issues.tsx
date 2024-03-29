import { useState } from "react";
import Image from "next/image";

export default function Issues() {
  const [currentFilter, setCurrentFilter] = useState('All issues')
  const tabsFilter = [
    {name: "All issues"},
    {name: "Errors", icon: <Image src={'/dashboard/error.svg'} alt="Error" width={24} height={24} /> },
    {name: "Warnings", icon: <Image src={'/dashboard/warning.svg'} alt="Warning issues" width={24} height={24} /> },
    {name: "Notices", icon: <Image src={'/dashboard/notices.svg'} alt="Notices" width={24} height={24} /> },
    {name: "Fixed", icon: <Image src={'/dashboard/fixed.svg'} alt="Fixed issues" width={24} height={24} /> },
  ];

  return (
    <main className="pb-14 grid w-full gap-8">
      <section className="flex flex-wrap items-center justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
        {
          tabsFilter.map((item, index)=> (
            <button 
              key={index}
              title={item.name} 
              className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] ${currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"}`} onClick={()=> setCurrentFilter(item.name)}>
              {item.icon && item.icon } {item.name}
            </button>
          ))
        }
        </div>
        <div className="flex">
          <div className="flex rounded-md w-[320px] border p-4 py-2">

          </div>
        </div>
      </section>
    </main>
  );
}
