import axiosInstance from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "../../../../../types";

const useGetPlans = () => {
    const getPlansReq = async (): Promise<Plan[]> => {
        const res = await axiosInstance.get('/subscription');
        return res.data;
    };

    const { data, isLoading, error, refetch } = useQuery<Plan[], Error>({
        queryKey: ['getPlans'],
        queryFn: getPlansReq,
    });

    return { data, isLoading, error, refetch };
};
 
export default useGetPlans;
