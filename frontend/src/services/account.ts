import type {
  AccountData,
  CustomAxiosRes,
  GetParams,
  ListData,
} from "../types/api";
import apiClient from "./apiClient";

// 계좌 목록 조회
export const getAccount = async (params: GetParams) => {
  const response = await apiClient.get<
    CustomAxiosRes<ListData<AccountData>>
    //   >(`/account?page=${params.page}&limit=${params.limit}`);
  >(`/account`);

  return response.data;
};
