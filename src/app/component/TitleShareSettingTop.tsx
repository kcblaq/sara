import { CiSettings } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import PlainButton from "./PlainButton";
import { shareOrFallback } from "../utils/shareContentOrFallback";

interface Props {
  title: string;
  updateData?: () => void;
  settings?: () => void;
}
export default function TitleShareSettingTop({ title }: Props) {
  return (
    <section
      className={`flex justify-between w-full items-center gap-4 text-[#101828] `}
    >
      <h1 className={`font-semibold text-4xl 2xl:text-5xl `}>{title} </h1>
      <div className="flex w-fit  items-center justify-end gap-2 md:gap-4 ">
        <span className="">
          <button className="rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500">
            Update data
          </button>
        </span>
        <span className="">
          <PlainButton
            moreClass="text-primary bg-[#EFF8FF]"
            title="Share"
            icon={<IoCloudUploadOutline />}
            handleClick={() =>
              shareOrFallback({
                url: "http://localhost:3000/dashboard/content-analysis",
                title: "Content Analysis",
                text: "content analysis",
              })
            }
          />
        </span>
        <span className="p-3 rounded-md border cursor-pointer ">
          <CiSettings />
        </span>
      </div>
    </section>
  );
}
