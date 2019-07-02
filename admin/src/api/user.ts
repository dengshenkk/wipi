import { http } from "./http";

export const login = (user: object): Promise<any> =>
  http({ method: "POST", url: "/user/login", data: user });

export const register = (user: object): Promise<any> =>
  http({ method: "POST", url: "/user/register", data: user });

export const fetchUsers = (): Promise<any> =>
  http({ method: "GET", url: "/user" });
