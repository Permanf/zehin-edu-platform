import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getQuestionById = async ({id}:{id:number}) => {
    const { data } = await api.get({ url:`/take_exam/exam/${id}` });
    return data?.data;
};

export function useGetQuestionById({id}:{id:number}) {
  return useQuery({ queryKey: ['questionById', id], queryFn: () => getQuestionById({id}) })
}