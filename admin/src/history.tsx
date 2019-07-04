import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

let globalHistory: any = null;

const BaseComponent: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { history } = props;
  globalHistory = history;
  return null;
};

export const History = withRouter(BaseComponent);

export const getHistory = () => globalHistory;
