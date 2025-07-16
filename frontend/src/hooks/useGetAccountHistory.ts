import { getAccountHistory } from "../services/history";
import type { GetParams } from "../types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountHistory = (
  params: GetParams & { accountId?: number }
) => {
  const { isPending, isError, data } = useQuery({
    queryKey: [
      "AccountHistory",
      `page-${params.page}`,
      `keyword-${params.keyword}`,
      `limit-${params.limit}`,
      `id-${params.accountId}`,
      `sort-${params.sort}`,
    ],
    queryFn: () => getAccountHistory(params),
    enabled: !!params.accountId,
  });

  return { isPending, isError, data };
};
