import { IAction } from "../action.interface";
import { ILoading } from "./loading.interface";
import { START_LOADING, STOP_LOADING } from "./loading.action";

const initialState: ILoading = {
  loading: false
};

export const startLoading = () => ({ type: START_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });

export const loadingReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};
