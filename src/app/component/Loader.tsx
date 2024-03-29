import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return <BiLoader className="w-full h-full animate-spin text-gray-300" />;
};

export default Loader;


export const LoadingState = () => {
  return (
    <div className="flex h-full w-1/3 mx-auto p-10 items-center justify-center ">
      <BiLoader className="w-full h-full animate-spin text-gray-300" />
    </div>
  )
}