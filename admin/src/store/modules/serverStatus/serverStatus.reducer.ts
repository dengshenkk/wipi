import { AnyAction } from "redux";
import { SET_STATUS } from "./serverStatus.action";
import { IServerStatusState } from "./serverStatus.interface";

const initialState: IServerStatusState = {};

export const serverStatusReducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
};
