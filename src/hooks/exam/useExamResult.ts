import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../store/api";
import { notifications } from "@mantine/notifications";

const examResult = async (answers: any) => {
  const { data } = await api.post({ url:"/take_exam/submit", params: answers, method: "POST"});
  return data;
};

export const useExamResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: any) => examResult(answers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examResult'] });
    },
    onError: (err: any) => {
        notifications.show({
          color: "red",
          title: 'Üstünlikli bolmady!',
          message: `${err.response.data.message}`,
        })
      },
  });
};