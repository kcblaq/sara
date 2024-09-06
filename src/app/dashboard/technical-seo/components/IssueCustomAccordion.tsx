import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IssueCustomAccordionProps {
  title: string;
  data?: [];
}
export default function IssueCustomAccordion({
  title,
  data,
}: IssueCustomAccordionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:bg-gray-200 active:bg-gray-200 p-3 rounded-md">
          {title}
        </AccordionTrigger>
        <AccordionContent className="px-2">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// old Ui

{
  /* <div className="grid" style={{ height: '100%' }}>
                <div className={`w-full flex justify-between items-center `} >
                  <h2 className={`text-[#344054] font-semibold text-lg`}>
                    Crawlability and indexibility
                  </h2>
                  <IoIosArrowDown className={`${!first && 'rotate-180'} cursor-pointer transition-all ease-out delay-300`} onClick={() => setfirst(!first)} />
                  
                </div>
                {
                  !first && <div className={`flex justify-between w-full`}>
                    <div className="flex gap-2 items-center text-[#344054] font-normal cursor-pointer" onClick={()=> alert('Clicked')}>
                      {tabsFilter[2].icon}
                      <p className={``}>Pages with duplicate content issues </p>
                    </div>
                    <span className="p-1 text-sm  rounded-3xl bg-green-300">
                      122
                    </span>

                  </div>
                }
              </div> */
}
