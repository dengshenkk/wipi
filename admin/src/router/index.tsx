import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DashBoard } from "../pages/DashBoard";
import { UserManager } from "../pages/UserManager";
import { Articles } from "../pages/Articles";
import { ArticleEditor } from "../pages/ArticleEditor";

export interface IRoute {
  path?: string;
  title: string;
  icon?: string;
  component?: any;
  children?: Array<IRoute>;
}

export const routes: IRoute[] = [
  {
    path: "/login",
    title: "login",
    component: Login
  },

  {
    path: "/register",
    title: "register",
    component: Register
  },

  {
    path: "/",
    icon: "dashboard",
    title: "dashBoard",
    component: DashBoard
  },

  {
    path: "/users",
    icon: "user",
    title: "userManager",
    component: UserManager
  },

  {
    icon: "table",
    title: "articleManager",

    children: [
      {
        path: "/article/list",
        icon: "table",
        title: "articleList",
        component: Articles
      },

      {
        path: "/article/new",
        icon: "global",
        title: "createArticle",
        component: ArticleEditor
      }
    ]
  }
];

export const breadcrumbNameMap: { [key: string]: string } = {
  "/": "dashBoard",
  "/users": "userManager",
  "/article": "articleManager",
  "/article/list": "articleList",
  "/article/new": "createArticle"
};

export const Router: React.FC = () => {
  return (
    <Switch>
      {routes
        .reduce((a: IRoute[], c: IRoute): IRoute[] => {
          if (c.children) {
            a.push.apply(a, c.children);
          } else {
            a.push(c);
          }
          return a;
        }, [])
        .map(({ path, component }) => (
          <Route key={path} path={path} exact={true} component={component} />
        ))}
      <Redirect path="/article" to="/article/list" />
    </Switch>
  );
};
