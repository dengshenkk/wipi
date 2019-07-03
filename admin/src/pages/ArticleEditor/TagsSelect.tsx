import React from "react";
import { Input, Icon, Checkbox } from "antd";
import { useTranslation } from "react-i18next";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

export const TagsSelect: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>{t("articleTags")}</h3>
      <CheckboxGroup options={plainOptions} style={{ marginBottom: 15 }} />
      <Input addonAfter={<Icon type="plus" />} defaultValue="mysite" />
    </div>
  );
};
