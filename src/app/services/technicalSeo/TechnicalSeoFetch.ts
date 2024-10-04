import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import ApiCall from "../../utils/apicalls/axiosInterceptor";

const fetchTechseoData = async (id: number) => {
  const result = await ApiCall.get(`/user/crawler/technical-seo/${id}`);
  console.log("tech seo", result.data);

  return result.data.project;
};

export const useTechnicalSeoFetchData = () => {
  const id = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );

  const { data, isLoading } = useQuery({
    queryKey: ["techseodata", id],
    queryFn: () => fetchTechseoData(id.id),
    // enabled: !!id, // To ensure the query runs only if the id is available
  });

  return { data, isLoading };
};
