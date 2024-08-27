import { FaCircle } from "react-icons/fa6";
import { RxQuestionMarkCircled } from "react-icons/rx";
import ProgressiveCircle from "./SeoprogressCircle";

export default function SiteHealthScore() {
  return (
    <div className="grid shadow-md border font-bold text-xl items-start h-full rounded-md p-2 md:p-6 w-full ">
      <h1 className={`text-[#101828] flex items-center gap-4`}>
        Site health
        <button title="This is the overall site health based on general best practice">
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
      <div className={``}>
        <ProgressiveCircle />
      </div>

      <div className="grid gap-3">
        <div className="flex items-center space-x-2 w-full text-sm">
          <FaCircle className="text-red-500" />
          <p className=" font-normal"> Low</p>
        </div>
        <div className="flex items-center space-x-2 w-full text-sm">
          <FaCircle className="text-yellow-500" />
          <p className=" font-normal"> Moderate</p>
        </div>
        <div className="flex items-center space-x-2 w-full text-sm">
          <FaCircle className="text-green-500" />
          <p className=" font-normal"> High</p>
        </div>
      </div>
    </div>
  );
}
