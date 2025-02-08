import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../store/api";

const loginUser = async (userData: any) => {
  const { data } = await api.post({ url:"/signin/index", params:userData, method:"POST"});
  return data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: any) => loginUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
    onError: (err: any) => {
        console.log(JSON.stringify(err.response.data.message));
      },
  });
};