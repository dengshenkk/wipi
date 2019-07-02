import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ILoading } from "./modules/loading/loading.interface";
import { loadingReducer } from "./modules/loading/loading.reducer";
import { IUserState } from "./modules/user/user.interface";
import { userReducer } from "./modules/user/user.reducer";

export interface IState {
  loading: ILoading;
  user: IUserState;
}

export const configStore = () => {
  const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer
  });

  let store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
