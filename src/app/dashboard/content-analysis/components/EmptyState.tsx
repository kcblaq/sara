import Input from "@/app/component/commons/Input";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className={`flex justify-center flex-col gap-4 h-full w-full py-52 px-12`}>
        <h1 className="text-[#101828] font-semibold text-5xl"> Content Analysis</h1>
        <p className=" font-medium text-xl text-[#101828]"> Input any word or phrase to search for pages with relevant content metrics </p>
        <div className="flex gap-8 items-end w-full">
        <Input className="w-full lg:w-96" isShowLabel labelName="Enter topic" placeholder="e.g. business branding" />
        <Button className=" text-white "> Search topic </Button>
        </div>
    </div>
  )
}
