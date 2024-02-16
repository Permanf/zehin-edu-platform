import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../store/api";
import { notifications } from "@mantine/notifications";

const loginUser = async (userData: any) => {
  const { data } = await api.post({ url:"/signin/index", params:userData, method:"POST"});
  // console.log(data)
  return data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: any) => loginUser(userData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['login'] });
      notifications.show({
        title: 'Üstünlikli boldy',
        message: '',
      })
    },
    onError: (err: any) => {
        console.log(JSON.stringify(err.response.data.message));
        notifications.show({
          color: "red",
          title: 'Üstünlikli bolmady!',
          message: `${err.response.data.message}`,
        })
      },
  });
};