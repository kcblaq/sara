import { RxQuestionMarkCircled } from "react-icons/rx";

interface Props {
    title: string;
    
}
export default function SubHead({title}: Props) {
  return (
    <div className="grid">
    <h1 className={`text-[#101828] flex items-center font-semibold text-xl gap-4`}>
        {title}
        <RxQuestionMarkCircled />
    </h1>
    <hr className='mt-2'/>
    </div>
  )
}
