import Image from "next/image"
import { PiCaretDown } from "react-icons/pi"

interface Props {
  title:string, src: string
}
export default function TableItems({title, src}: Props) {
  return (
    <div className="flex items-center gap-2">
        <Image src={`${src}`} alt={"Warning icon"} height={40} width={40}  />
        <div className="flex flex-col">
            <p className="text-[#101828] font-medium w-full truncate"> {title} </p>
            <p className=" text-[#475467] gap-1 flex items-center font-normal cursor-pointer "> Description and how to fix <PiCaretDown />
 </p>
        </div>
    </div>
  )
}
