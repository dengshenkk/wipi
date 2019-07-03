import React from "react";
import { Row, Col, Layout } from "antd";
import classnames from "classnames";
import { SelectLang } from "../components/SelectLang";
import { UserInfo } from "../components/UserInfo";
import { DefaultFooter } from "../components/DefaultFooter";
import { NavMenu } from "../components/NavMenu";
import "./TopLayout.less";

const { Header, Content } = Layout;

type Props = {
  theme: "light" | "dark" | undefined;
  layoutMode: string;
};

export const TopLayout: React.FC<Props> = props => {
  const { layoutMode, theme, children } = props;

  return (
    <Layout className="layout layout--horizontal">
      <Header
        className={classnames("layout-heade", "layout-header--top", {
          "layout-header--light": theme === "light"
        })}
      >
        <Row>
          <Col xs={20} sm={16}>
            <div className="logo" />
            <NavMenu layoutMode={layoutMode} theme={theme} />
          </Col>

          <Col xs={4} sm={8} style={{ textAlign: "right", paddingRight: 12 }}>
            <UserInfo />
            <SelectLang />
          </Col>
        </Row>
      </Header>

      <Content className="layout-content layout-content--top">
        <div className="page">
          <main>{children}</main>
          <DefaultFooter />
        </div>
      </Content>
    </Layout>
  );
};
