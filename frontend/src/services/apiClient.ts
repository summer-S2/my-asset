import axios, { type InternalAxiosRequestConfig } from "axios";

export const apiURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiURL,
  //   withCredentials: true, // 쿠키 포함
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const token = localStorage.getItem("ACCESS_TOKEN");

  config.headers = config.headers ?? {};
  // 토큰 설정
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

export default apiClient;
