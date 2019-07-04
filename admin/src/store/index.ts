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

export interface IState {
  loading: ILoading;
  user: IUserState;
  tag: ITagState;
  article: IArticleState;
}

export const configStore = () => {
  const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
    tag: tagReducer,
    article: articleReducer
  });

  let store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
