import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DashBoard } from "../pages/DashBoard";
import { UserManager } from "../pages/UserManager";
import { Articles } from "../pages/Articles";
import { ArticleEditor } from "../pages/ArticleEditor";

export const routes = [
  {
    path: "/login",
    icon: "global",
    title: "login",
    component: Login
  },

  {
    path: "/register",
    icon: "global",
    title: "register",
    component: Register
  },

  {
    path: "/",
    icon: "global",
    title: "dashBoard",
    component: DashBoard
  },

  {
    path: "/users",
    icon: "global",
    title: "users",
    component: UserManager
  },

  {
    path: "/articles",
    icon: "global",
    title: "articles",
    component: Articles
  },

  {
    path: "/article/add",
    icon: "global",
    title: "articleEditor",
    component: ArticleEditor
  }
];

export const Router: React.FC = () => {
  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} exact={true} component={component} />
      ))}
    </Switch>
  );
};
