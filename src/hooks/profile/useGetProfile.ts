import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getProfile = async () => {
    const {data} = await api.get({ url:"/profile" });
    return data?.data;
};

export function useGetProfile() {
  return useQuery({ queryKey: ['profile'], queryFn: getProfile })
}