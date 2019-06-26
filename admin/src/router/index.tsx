import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DashBoard } from "../pages/DashBoard";

export const routes = [
  {
    path: "/",
    icon: "global",
    title: "dashBoard",
    component: DashBoard
  },

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
