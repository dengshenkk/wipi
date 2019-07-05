import axios from "axios";
import { getHistory } from "../history";

export const http = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    let token = window.sessionStorage.getItem("token");

    if (config.url !== "/user/login" && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    throw err;
  }
);

http.interceptors.response.use(
  res => {
    if (res.status && res.status === 200) {
      const data = res.data;
      return data;
    } else {
      return res;
    }
  },
  err => {
    if (+err.response.status === 504 || +err.response.status === 404) {
      console.error({ message: "API, 服务器被吃了⊙﹏⊙∥", err });
      const history = getHistory();
      history && history.replace("/404");
    } else if (+err.response.status === 403) {
      console.error({ message: "API, 权限不足,请联系管理员!", err });
      const history = getHistory();
      history && history.replace("/403");
    } else if (+err.response.status !== 400) {
      const history = getHistory();
      history && history.replace("/500");
      console.error({ message: "API, 未知错误!", err });
    }
    throw err;
  }
);
