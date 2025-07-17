import type {
  CustomAxiosRes,
  GetParams,
  History,
  ListData,
} from "../types/api";
import { objectToQueryString } from "../utils/fn";
import apiClient from "./apiClient";

// 계좌 내역 조회 (id로 특정 계좌 조회)
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

// 전체 계좌 조회
export const getAccountHistoryAll = async (params: GetParams) => {
  const query = objectToQueryString(params);

  const response = await apiClient.get<CustomAxiosRes<ListData<History>>>(
    `/account-history${query}`
  );

  return response.data;
};
