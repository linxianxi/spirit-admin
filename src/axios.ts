import axios, { AxiosError } from "axios";
import { history } from "./main";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (request) {
  request.headers = {
    authorization: localStorage.getItem("token") || "",
  };
  return request;
});
