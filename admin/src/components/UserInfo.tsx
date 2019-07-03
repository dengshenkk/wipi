import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import { IState } from "../store";

const mapStateToProps = (state: IState) => ({
  currentUser: state.user.currentUser
});

type Props = ReturnType<typeof mapStateToProps>;

const User = (props: Props) => {
  const { t } = useTranslation();
  const { currentUser } = props;

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
      <div
        style={{
          display: "inline-block",
          padding: "0 12px",
          cursor: "pointer"
        }}
      >
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          size={"small"}
          icon="user"
        />
        {currentUser ? <span>{currentUser.name}</span> : null}
      </div>
    </Dropdown>
  );
};

export const UserInfo = connect(
  mapStateToProps,
  null
)(User);
