import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    let token = window.sessionStorage.getItem("token");

    if (token) {
      token = JSON.parse(token);
    }

    if (config.url !== "/user/login" && config.url !== "/user/register") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    throw new Error(err);
  }
);
