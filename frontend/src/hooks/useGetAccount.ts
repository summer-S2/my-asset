import { getAccount } from "../services/account";
import { useAlertStore } from "../stores/alertStore";
import type { GetParams } from "../types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (params: GetParams) => {
  const { openAlert } = useAlertStore();
  const { isPending, isError, data } = useQuery({
    queryKey: [
      "Account",
      `page-${params.page}`,
      `keyword-${params.keyword}`,
      `limit-${params.limit}`,
      `sort-${params.sort}`,
    ],
    queryFn: async () => {
      try {
        return await getAccount(params);
      } catch (err) {
        openAlert({
          title: "오류 발생",
          message: `계좌 목록 데이터를 불러오는 중 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.`,
        });
      }
    },
  });

  return { isPending, isError, data };
};
