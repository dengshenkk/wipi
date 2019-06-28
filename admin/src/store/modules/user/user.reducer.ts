import { message } from "antd";
import { startLoading, stopLoading } from "../loading/loading.reducer";
import { login as loginAjax } from "../../../api/user";
import { IAction } from "../action.interface";
import { LOGIN, REGISTER } from "./user.action";
import { IUser } from "./user.interface";

const initialState: IUser = {
  user: {}
};

export const login = (user: object) => async (dispatch: Function) => {
  startLoading();

  return loginAjax(user)
    .then(data => {
      dispatch({ type: LOGIN, payload: data });
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
