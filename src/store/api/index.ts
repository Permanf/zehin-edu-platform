import axios from "axios";
import { IDeleteApi, IGetApi, IPostApi, IUpdateApi, IUploadApi } from "./api.interface";
import { GetCookie } from "../../utils/cookie";


export const axiosInstance = axios.create({
  // baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: null,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data === "Unauthorized" 
    ) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        //   Authorization: `Bearer ${GetCookie("refresh_token")}`,
        },
        withCredentials: true,
      };
      return axiosInstance
        .get("api/auth/token-refresh", config)
        .then((response) => {
          axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        //   store.dispatch(userLoaded(response.data));
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          axiosInstance.defaults.headers.Authorization = null;
          originalRequest.headers.Authorization = null;
        //   store.dispatch(Logout1());
          return Promise.reject(error);
        });
    } else {
      axiosInstance.defaults.headers.Authorization = null;
      originalRequest.headers.Authorization = null;
      //store.dispatch(Logout());
      return Promise.reject(error);
    }
  }
);
export const api = {
  get: async ({ url} : IGetApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token-zehin")}`,
      },
    };
    return await axiosInstance.get(url, config);
  },
  post: async ({ url, params, method } : IPostApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token-zehin")}`, 
      },
    };
    return method == "POST" ? await axiosInstance.post(url, params, config) : await axiosInstance.put(url, params, config);
  },
  update: async ({ url, token, params } : IUpdateApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await axiosInstance.put(url, params, config);
  },
  delete: async ({ url, token, id } : IDeleteApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: id,
    };
    return await axiosInstance.delete(url, config);
  },
  upload: async ({ url, token, formData } : IUploadApi ) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    return await axiosInstance.post(url, formData, config);
  },
};
