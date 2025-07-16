import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../services/account";
import { message } from "antd";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Account"] });
      if (data.code === 200) {
        message.success("계좌 삭제가 완료되었습니다 😁");
      }
    },
  });
  return mutation;
};
