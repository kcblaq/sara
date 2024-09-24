import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function currentPropertyId() {
    const property_id = useSelector((state: RootState) => state.property.activePropertyObj.id);
  return property_id
}
