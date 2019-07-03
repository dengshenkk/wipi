import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DashBoard } from "../pages/DashBoard";
import { Ownspace } from "../pages/Ownspace";
import { UserManager } from "../pages/UserManager";
import { Articles } from "../pages/Articles";
import { ArticleEditor } from "../pages/ArticleEditor";
import { TagManager } from "../pages/TagManager";

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
    path: "/ownspace",
    icon: "dashboard",
    title: "ownspace",
    component: Ownspace
  },

  {
    path: "/users",
    icon: "team",
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
        icon: "form",
        title: "createArticle",
        component: ArticleEditor
      },

      {
        path: "/article/tag",
        icon: "tag",
        title: "tagManager",
        component: TagManager
      }
    ]
  }
];

export const breadcrumbNameMap: { [key: string]: string } = {
  "/": "dashBoard",
  "/ownspace": "ownspace",
  "/users": "userManager",
  "/article": "articleManager",
  "/article/list": "articleList",
  "/article/new": "createArticle",
  "/article/tag": "tagManager"
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
