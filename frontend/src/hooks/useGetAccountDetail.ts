import { getAccountDetail } from "../services/account";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountDetail = (id?: number) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["AccountDetail", `id-${id}`],
    queryFn: () => getAccountDetail(id as number),
    enabled: !!id,
  });

  return { isPending, isError, data };
};
