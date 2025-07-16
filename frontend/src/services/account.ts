import type {
  Account,
  CustomAxiosRes,
  GetParams,
  ListData,
} from "../types/api";
import apiClient from "./apiClient";

// 계좌 목록 조회
export const getAccount = async (params: GetParams) => {
  const response = await apiClient.get<CustomAxiosRes<ListData<Account>>>(
    `/account?page=${params.page}&limit=${params.limit}${
      params.keyword ? `&keyword=${params.keyword}` : ``
    }${params.sort ? `&sort=${params.sort}` : ``}`
  );
  //   >(`/account`);

  return response.data;
};

// 계좌 등록
export const postAccount = async (payload: FormData) => {
  const response = await apiClient.post<CustomAxiosRes<{}>>(
    `/account`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

// 계좌 수정
export const patchAccount = async (payload: FormData) => {
  const response = await apiClient.patch<CustomAxiosRes<{}>>(
    `/account`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

// 계좌 삭제
export const deleteAccount = async (id: number) => {
  const response = await apiClient.delete<CustomAxiosRes<{}>>(`/account/${id}`);

  return response.data;
};
