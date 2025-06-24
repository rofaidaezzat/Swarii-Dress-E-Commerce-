import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";
interface IAthenticatedQuery{
    queryKey:string[],
    url:string,
    config?:AxiosRequestConfig
}
const useCustomQuery=({queryKey,url,config}:IAthenticatedQuery)=>{
return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get(url, config);
      return response.data.data;
},
})
}
export default useCustomQuery