import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ILoading } from "./modules/loading/loading.interface";
import { loadingReducer } from "./modules/loading/loading.reducer";
import { IUser } from "./modules/user/user.interface";
import { userReducer } from "./modules/user/user.reducer";

export interface IState {
  loading: ILoading;
  user: IUser;
}

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer
});

export const configStore = () => {
  let store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
