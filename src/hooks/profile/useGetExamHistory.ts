import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getExamHistory = async ({id}:{id?:string}) => {
    const {data} = await api.get({ url:`/take_exam/history/${id}`});
    return data?.data;
};

export function useGetExamHistory({id}:{id?:string}) {
  return useQuery({ queryKey: ['examHistory', id], queryFn: () => getExamHistory({id}) })
}