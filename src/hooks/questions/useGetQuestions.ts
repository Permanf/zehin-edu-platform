import { useQuery } from "@tanstack/react-query";
import { api } from "../../store/api";

const getQuestions = async () => {
    const { data } = await api.get({ url:"/online_exam", });
    return data?.data;
};

export function useGetQuestions() {
  return useQuery({ queryKey: ['questions'], queryFn: getQuestions })
}