import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/lib/axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const useCreateCheckoutSession = () => {
    const createCheckoutSessionReq = async( planId : string) => {
        const res = await axiosInstance.post(`${API}/subscription/create-checkout-session/${planId}`)
        return res.data;
    }

    const { mutateAsync: createCheckoutSession, isPending, error } = useMutation({
        mutationFn: createCheckoutSessionReq,
        mutationKey: ['createCheckoutSession'],
    });

    return { createCheckoutSession, isPending, error };
};

export default useCreateCheckoutSession;
