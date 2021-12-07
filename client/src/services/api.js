/* eslint-disable no-undef */
import axios from "axios";
const baseUrl = process.env.REACT_APP_API;

export const authInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
