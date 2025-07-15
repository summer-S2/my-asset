import { getAccount } from "../services/account";
import type { GetParams } from "../types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (params: GetParams) => {
  const { isPending, isError, data } = useQuery({
    queryKey: [
      "Account",
      `page-${params.page}`,
      `keyword-${params.keyword}`,
      `limit-${params.limit}`,
    ],
    queryFn: () => getAccount(params),
  });

  return { isPending, isError, data };
};
