import React, { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Divider,
  Icon,
  Switch,
  Typography
} from "antd";
import { ThemeColor } from "./ThemeColor";

type Props = {
  layoutMode: string;
  onLayoutModeChange: Function;
  theme: "light" | "dark" | undefined;
  onThemeChange: Function;
};

export const LayoutSetting: React.FC<Props> = (props: Props) => {
  const [visible, toggleVisible] = useState(false);
  const { layoutMode, onLayoutModeChange, theme, onThemeChange } = props;
  const width = 300;

  return (
    <>
      <Button
        type="primary"
        icon="setting"
        onClick={() => toggleVisible(true)}
        style={{
          position: "fixed",
          right: 0,
          top: 100,
          zIndex: 1000
        }}
      />
      <Drawer
        title={null}
        placement="right"
        closable={true}
        onClose={() => toggleVisible(false)}
        visible={visible}
        width={width}
      >
        <Typography.Paragraph>布局模式</Typography.Paragraph>
        <div>
          <div
            className={"block-checkbox-item"}
            onClick={() => onLayoutModeChange("vertical")}
          >
            <Avatar
              shape="square"
              size={"large"}
              src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
              icon="check"
            />
            {layoutMode === "vertical" ? <Icon type="check" /> : null}
          </div>

          <div
            className={"block-checkbox-item"}
            onClick={() => onLayoutModeChange("horizontal")}
          >
            <Avatar
              style={{ marginLeft: 15 }}
              shape="square"
              size={"large"}
              src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"
              icon="check"
            />
            {layoutMode === "horizontal" ? <Icon type="check" /> : null}
          </div>
        </div>

        <br />

        <ThemeColor />

        <Divider />

        <Typography.Paragraph
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>导航菜单主题</span>
          <Switch
            checkedChildren="亮色"
            unCheckedChildren="暗色"
            checked={theme === "light"}
            onChange={val => {
              onThemeChange(val ? "light" : "dark");
            }}
          />
        </Typography.Paragraph>
      </Drawer>
    </>
  );
};
