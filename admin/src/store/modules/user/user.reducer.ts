import { AnyAction } from "redux";
import { startLoading, stopLoading } from "../loading/loading.reducer";
import {
  login as loginAjax,
  register as registerAjax,
  fetchUsers as fetchUsersAjax
} from "../../../api/user";
import { LOGIN, REGISTER, FETCH_USERS } from "./user.action";
import { IUserState } from "./user.interface";

const initialState: IUserState = {
  count: 0
};

export const login = (user: object) => async (dispatch: Function) => {
  startLoading();

  return loginAjax(user)
    .then(data => {
      dispatch({ type: LOGIN, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const register = (user: object) => async (dispatch: Function) => {
  startLoading();

  return registerAjax(user)
    .then(data => {
      dispatch({ type: REGISTER, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const fetchUsers = () => async (dispatch: Function) => {
  startLoading();

  return fetchUsersAjax()
    .then(data => {
      console.log("user", data);
      dispatch({ type: FETCH_USERS, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.data,
        count: action.payload.count || 0
      };

    case REGISTER:
      return state;

    default:
      return state;
  }
};
