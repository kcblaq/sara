import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "../../utils/apicalls/axiosInterceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import currentPropertyId from "@/app/utils/currentPropertyId";

interface RankProps {
    location_code: number,
    target: string
}


export const UseRankTrackingOverview = async () => {
    const id = currentPropertyId()

    const { isError, isSuccess, isPending, data } = useQuery({
        queryKey: ["ranktracker_overview", id],
        queryFn:  async() => {
            const result = await ApiCall.get(`user/crawler/rank-tracking/by-tab/${id}?tab=overview`);
            return result.data
        }
    })
    return { isError, isSuccess, isPending, data}
}


export const useRankTrackingRankingTab = async() => {
    const id = currentPropertyId();

 const {isError, isSuccess, isPending, data} = useQuery({
    queryKey: ['ranktracker_ranking', id],
    queryFn: async()=> {
        const response = await ApiCall.get(`user/crawler/rank-tracking/by-tab/${id}?tab=ranking`)
        return response.data;
    }
 })
 return {isError, isSuccess, isPending, data }
}



export const RankTrackerCrawler = async (url: string) => {
    const property_id = useSelector((state: RootState) => state.property.activePropertyObj.id)


    const rankCrawler = useMutation({
        mutationFn: async ({ location_code, target }: RankProps) => {
            const response = await ApiCall.post(`user/crawler/rank-tracking/${property_id}`, [{
                target,
                location_code
            }])

            return response.data;
        },
        onError: (error) => error.message,
        onSuccess: (data) => console.log()
    })
    return rankCrawler;

}