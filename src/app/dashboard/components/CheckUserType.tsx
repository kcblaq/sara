
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

interface Props {
    close: ()=> void;
}

export default function CheckUserType({close}:Props) {
    const router = useRouter()
  return (
    <div className="grid gap-3">
       <div className="grid w-full gap-2">
       <h3 className=" text-lg font-semibold"> This is a paid feature</h3>
       <hr/>
       </div>

       <div className="flex items-center gap-2 w-full justify-end">
       <Button variant="cancel" onClick={close}> Cancel</Button>
       <Button onClick={()=> router.push("/pricing")}> Subscribe</Button>
       </div>
    </div>
  )
}