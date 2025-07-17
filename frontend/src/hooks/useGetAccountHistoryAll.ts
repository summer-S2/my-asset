import { getAccountHistoryAll } from "../services/history";
import type { GetParams } from "../types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountHistoryAll = (params: GetParams) => {
  const { isPending, isError, data } = useQuery({
    queryKey: [
      "AccountHistoryAll",
      `page-${params.page}`,
      `keyword-${params.keyword}`,
      `limit-${params.limit}`,
      `sort-${params.sort}`,
    ],
    queryFn: () => getAccountHistoryAll(params),
  });

  return { isPending, isError, data };
};
