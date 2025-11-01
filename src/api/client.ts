import axios, { type AxiosResponse, type AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.resolve({ data: null, cancelled: true });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
