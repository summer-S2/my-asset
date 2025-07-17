import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAccount } from "../services/account";
import { message } from "antd";

export const usePostAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Account"] });
      queryClient.invalidateQueries({ queryKey: ["AccountHistoryAll"] });
      if (data.code === 200) {
        message.success("계좌 등록이 완료되었습니다 😁");
      }
    },
    onError: (err) => {
      message.error(err.response?.data.message);
    },
  });
  return mutation;
};
