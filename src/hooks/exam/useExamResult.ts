import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../store/api";
import { notifications } from "@mantine/notifications";

const examResult = async (answers: any) => {
  const { data } = await api.post({ url:"/take_exam/submit", params: answers, method: "POST"});
  // console.log(data)
  return data;
};

export const useExamResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: any) => examResult(answers),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['examResult'] });
      // notifications.show({
      //   title: 'Üstünlikli testi tabşyrdyňyz!',
      //   message: '',
      // })
    },
    onError: (err: any) => {
        // console.log(JSON.stringify(err.response.data.message));
        notifications.show({
          color: "red",
          title: 'Üstünlikli bolmady!',
          message: `${err.response.data.message}`,
        })
      },
  });
};