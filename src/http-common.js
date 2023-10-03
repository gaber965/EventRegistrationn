import axios from "axios";
import apiConfigs from "src/configs/api";

import { Notify } from "quasar";
import { getMessage } from "./configs/ApiErrorMsgs";

let authKey = localStorage.getItem("accessToken");
export const axoisInstance = axios.create({
  baseURL: apiConfigs.baseURL,
  headers: {
    Authorization: "Bearer " + authKey,
  },
});
export const axiosInstanceUser = axios.create({
  baseURL: apiConfigs.loginSpeakerUrl,
  headers: {
    Authorization: "Bearer " + authKey,
  },
});

(axiosInstanceUser , axoisInstance).interceptors.request.use(
  async (req) => {
    authKey = localStorage.getItem("accessToken");
    req.headers.Authorization = "Bearer " + authKey;
    return req;
  },
  (error) => Promise.reject(error)
);

(axoisInstance, axiosInstanceUser).interceptors.response.use(
  async (response) => {
    const unAuthorized = 401;
    if (response.data.StatusCode === unAuthorized) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      Notify.create({
        type: "negative",
        color: "negative",
        timeout: 1000,
        position: "bottom",
        message: response.data.Message,
      });
    }
    return response;
  },
  (error) => Promise.reject(error)
);
