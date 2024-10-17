import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "../../utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";

export const useLinkBuildingOverview = (tab: string) => {
  const id = CurrentProperty();

  const { isError, isSuccess, isPending, data } = useQuery({
    queryKey: ["link_building_overview", id.id],
    queryFn: async () => {
      const result = await ApiCall.get(
        `/user/crawler/back-link/by-tab/${id.id}?tab=${tab}`
      );
      return result.data;
    },
  });
  return { isError, isSuccess, isPending, data };
};
