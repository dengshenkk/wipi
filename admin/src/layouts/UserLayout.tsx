import * as React from "react";
import classnames from "classnames";
import { SelectLang } from "../components/SelectLang";

export const UserLayout: React.FC = props => {
  return (
    <div className={classnames("container")}>
      <div className={classnames("lang")}>
        <SelectLang />
      </div>
      <div className={classnames("content")}>{props.children}</div>
    </div>
  );
};
