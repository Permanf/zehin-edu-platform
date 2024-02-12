import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getUsers = async () => {
    const data = await api.get({ url:"/banners", token: null });
    return data;
};

export function useGetUsers() {
  return useQuery({ queryKey: ['users'], queryFn: getUsers })
}