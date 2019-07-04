import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ILoading } from "./modules/loading/loading.interface";
import { loadingReducer } from "./modules/loading/loading.reducer";
import { IUserState } from "./modules/user/user.interface";
import { userReducer } from "./modules/user/user.reducer";

import { ITagState } from "./modules/tag/tag.interface";
import { tagReducer } from "./modules/tag/tag.reducer";

import { IArticleState } from "./modules/article/article.interface";
import { articleReducer } from "./modules/article/article.reducer";

import { IServerStatusState } from "./modules/serverStatus/serverStatus.interface";
import { serverStatusReducer } from "./modules/serverStatus/serverStatus.reducer";

export interface IState {
  loading: ILoading;
  user: IUserState;
  tag: ITagState;
  article: IArticleState;
  serverStatus: IServerStatusState;
}

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  tag: tagReducer,
  article: articleReducer,
  serverStatus: serverStatusReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
