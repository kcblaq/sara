import Image from "next/image"
import { PiCaretDown } from "react-icons/pi"
export default function TableItems() {
  return (
    <div className="flex items-center gap-2">
        <Image src={`/dashboard/warning.png`} alt={"Warning icon"} height={40} width={40}  />
        <div className="flex flex-col">
            <p className="text-[#101828] font-medium"> Hreflang conflicts within page source code</p>
            <p className=" text-[#475467] gap-1 flex items-center font-normal cursor-pointer "> The beginning of wisdom <PiCaretDown />
 </p>
        </div>
    </div>
  )
}
