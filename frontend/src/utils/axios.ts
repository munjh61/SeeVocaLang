import axios from "axios";
import { useAuthStore } from "../stores/AuthStore.ts";
import { BASE_URL } from "../types/Regex.ts";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
