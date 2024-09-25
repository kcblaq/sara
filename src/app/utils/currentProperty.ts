import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function currentProperty() {
    const property = useSelector((state: RootState) => state.property.activePropertyObj);
    return property
}
