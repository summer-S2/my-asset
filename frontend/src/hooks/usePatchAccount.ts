import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchAccount } from "../services/account";
import { message } from "antd";

export const usePatchAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patchAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Account"] });
      queryClient.invalidateQueries({ queryKey: ["AccountDetail"] });
      queryClient.invalidateQueries({ queryKey: ["AccountHistoryAll"] });
      if (data.code === 200) {
        message.success("계좌 수정이 완료되었습니다 😁");
      }
    },
    onError: (err) => {
      message.error(err.response?.data.message);
    },
  });
  return mutation;
};
