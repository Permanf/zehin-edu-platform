import axios from "axios";
import { IDeleteApi, IGetApi, IPostApi, IUpdateApi, IUploadApi } from "./api.interface";
import { GetCookie } from "../../utils/cookie";
// import store from "../index";
// import { userLoaded } from "../actions/auth";
// import { Logout1 } from "../middlewares/auth";
// import { GetCookie } from "../../utils/cookie";

// const API_BASE_URL = process.env.REACT_APP_IS_PRODUCTION === 'development' ? process.env.REACT_APP_API_BASE_URL :  process.env.REACT_APP_API_BASE_PRODUCTION_URL;

export const axiosInstance = axios.create({
    // baseURL: API_BASE_URL,
  baseURL: "http://93.171.223.101:880/api/v10",
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
    //   && GetCookie("refresh_token")
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
          console.log(response);
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
    // console.log(token)
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
    // console.log(token)
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
