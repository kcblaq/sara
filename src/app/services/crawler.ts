import ApiCall from "../utils/apicalls/axiosInterceptor"

export const crawler = (url:string, payload:any)=> {
    ApiCall.get(url, {
        params: payload
    })
}