import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getQuestionById = async ({id}:any) => {
    const { data } = await api.get({ url:`/take_exam/exam/${id}` });
    return data?.data;
};

export function useGetQuestionById({id}:any) {
  return useQuery({ queryKey: ['questionById', id], queryFn: () => getQuestionById({id}) })
}