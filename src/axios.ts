import axios, { AxiosError } from "axios";
import { router } from "./App";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      router.navigate("/login");
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function (request) {
  const token = localStorage.getItem("token") || "";
  if (request.headers) {
    request.headers.authorization = token;
  } else {
    request.headers = {
      authorization: token,
    };
  }

  return request;
});
