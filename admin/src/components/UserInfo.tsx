import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";

export const UserInfo = () => {
  const { t } = useTranslation();

  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/ownspace">{t("ownspace")}</NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/login">{t("logout")}</NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
    </Dropdown>
  );
};
