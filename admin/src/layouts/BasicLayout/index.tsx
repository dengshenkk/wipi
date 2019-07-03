import React, { useState } from "react";
import { Row, Col, Layout, Icon } from "antd";
import classnames from "classnames";
import { SelectLang } from "../../components/SelectLang";
import { UserInfo } from "../../components/UserInfo";
import { DefaultFooter } from "../../components/DefaultFooter";
import { LayoutSetting } from "./LayoutSetting";
import { NavMenu } from "./NavMenu";
import { PageHeader, Props as PageHeaderProps } from "./PageHeader";
import "./BasicLayout.less";

const { Header, Sider, Content } = Layout;

type Props = {} & PageHeaderProps;

export const BasicLayout: React.FC<Props> = props => {
  const { title, subTitle, renderHeaderChildren } = props;
  const WrappedPageHeader = () => (
    <PageHeader
      title={title}
      subTitle={subTitle}
      renderHeaderChildren={renderHeaderChildren}
    />
  );

  // 整体布局模式
  const [layoutMode, setLayoutMode$0] = useState(
    window.localStorage.getItem("layoutMode") || "vertical"
  );
  const setLayoutMode = (mode: string) => {
    window.localStorage.setItem("layoutMode", mode);
    setLayoutMode$0(mode);
  };

  // 导航菜单主题
  const [theme, setTheme$0]: [
    "light" | "dark" | undefined,
    Function
  ] = useState(
    window.localStorage.getItem("theme") === "light" ? "light" : "dark"
  );
  const setTheme = (theme: string) => {
    window.localStorage.setItem("theme", theme);
    setTheme$0(theme);
  };

  const WrappedLayoutSetting = () => (
    <LayoutSetting
      layoutMode={layoutMode}
      onLayoutModeChange={setLayoutMode}
      theme={theme}
      onThemeChange={setTheme}
    />
  );

  const WrappedNavMenu = () => (
    <NavMenu layoutMode={layoutMode} theme={theme} />
  );

  // 设置菜单收起状态
  const [collapsed, toggleCollapse] = useState(false);

  return layoutMode === "vertical" ? (
    <Layout className={classnames("layout", "layout-vertical")}>
      <WrappedLayoutSetting />
      <Sider
        className={classnames("layout-sider", {
          "layout-sider--light": theme === "light",
          "layout-sider--dark": theme === "dark"
        })}
        breakpoint={"xs"}
        onBreakpoint={isXs => {
          toggleCollapse(isXs);
        }}
        trigger={null}
        collapsible
        collapsedWidth={0}
        collapsed={collapsed}
      >
        <div className="logo" />
        <WrappedNavMenu />
      </Sider>
      <Layout className={classnames("layout-content--vertical")}>
        <Header>
          <Row>
            <Col xs={4} sm={2}>
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => toggleCollapse(!collapsed)}
              />
            </Col>

            <Col xs={20} sm={22} style={{ textAlign: "right" }}>
              <UserInfo />
              <SelectLang />
            </Col>
          </Row>
        </Header>
        <Content>
          <WrappedPageHeader />
          <main>{props.children}</main>
          <DefaultFooter />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout className="layout layout--horizontal">
      <WrappedLayoutSetting />
      <Header
        className={classnames("layout-header", "layout-header--horizontal", {
          "layout-header--light": theme === "light"
        })}
      >
        <Row>
          <Col xs={20} sm={16}>
            <div className="logo" />
            <WrappedNavMenu />
          </Col>

          <Col xs={4} sm={8} style={{ textAlign: "right" }}>
            <UserInfo />
            <SelectLang />
          </Col>
        </Row>
      </Header>

      <Content className="layout-content layout-content--horizontal">
        <WrappedPageHeader />
        <main>
          <div>{props.children}</div>
          <DefaultFooter />
        </main>
      </Content>
    </Layout>
  );
};
