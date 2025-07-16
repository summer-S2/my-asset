import type {
  CustomAxiosRes,
  GetParams,
  History,
  ListData,
} from "../types/api";
import apiClient from "./apiClient";

// 계좌 내역 조회
export const getAccountHistory = async (
  params: GetParams & { accountId?: number }
) => {
  const response = await apiClient.get<CustomAxiosRes<ListData<History>>>(
    `/account-history/${params.accountId}?page=${params.page}&limit=${
      params.limit
    }&keyword=${params.keyword}${params.sort ? `&sort=${params.sort}` : ``}`
  );

  return response.data;
};
