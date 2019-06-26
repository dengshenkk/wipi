import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Icon } from "antd";
import classnames from "classnames";

export const SelectLang = () => {
  const { i18n } = useTranslation();
  let [currentLanguage, changeCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    changeCurrentLanguage(i18n.language);
  };

  const menu = () => {
    return (
      <Menu>
        {[
          { key: "zhCN", name: "简体中文" },
          { key: "en", name: "English" }
        ].map(lng => (
          <Menu.Item
            key={lng.key}
            className={classnames({
              "ant-dropdown-menu-item-selected": lng.key === currentLanguage
            })}
            onClick={() => changeLanguage(lng.key)}
          >
            {lng.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <Icon type="global" />
    </Dropdown>
  );
};
