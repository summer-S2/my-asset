import { getAccountDetail } from "../services/account";
import { useQuery } from "@tanstack/react-query";
import { useAlertStore } from "../stores/alertStore";

export const useGetAccountDetail = (id?: number) => {
  const { openAlert } = useAlertStore();
  const { isPending, isError, data } = useQuery({
    queryKey: ["AccountDetail", `id-${id}`],
    // queryFn: () => getAccountDetail(id as number),
    queryFn: async () => {
      try {
        return await getAccountDetail(id as number);
      } catch (err) {
        openAlert({
          title: "오류 발생",
          message: `계좌 정보를 불러오는 중 오류가 발생했습니다.\n잠시 후에 다시 시도해 주세요.`,
        });
      }
    },
    enabled: !!id,
  });

  return { isPending, isError, data };
};
