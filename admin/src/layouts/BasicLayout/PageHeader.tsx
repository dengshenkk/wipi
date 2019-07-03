import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Breadcrumb, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { breadcrumbNameMap } from "../../router";
const { Paragraph } = Typography;

export type Props = {
  title?: string;
  subTitle?: string;
  renderHeaderChildren?: () => React.ReactElement;
};

const BaseComponent: React.FC<Props & RouteComponentProps> = props => {
  const { t } = useTranslation();
  const { history, title, subTitle, renderHeaderChildren } = props;

  const pathname = history.location.pathname;
  const pathSnippets = pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{t(breadcrumbNameMap[url])}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{t("dashBoard")}</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (
    <header style={{ background: "#fff" }}>
      <div>
        <Breadcrumb style={{ marginBottom: 12 }}>{breadcrumbItems}</Breadcrumb>
        {title ? <h3>{title}</h3> : null}
        {subTitle ? <Paragraph>{subTitle}</Paragraph> : null}
        {(renderHeaderChildren && renderHeaderChildren()) || null}
      </div>
    </header>
  );
};

export const PageHeader: React.ComponentType<Props> = withRouter(BaseComponent);
