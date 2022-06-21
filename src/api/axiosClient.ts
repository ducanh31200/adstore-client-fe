import axios, { AxiosRequestHeaders } from "axios";
import { getFromLocalStorage } from "../helper/base.helpers";

const axiosClient = axios.create({
  baseURL: "https://adstoresv.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getFromLocalStorage("accessToken");
    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`,
      // "Access-Control-Allow-Origin": "*",
    };
    if (token) config.headers = { ...config.headers, ...headers };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
  }
);

export default axiosClient;
