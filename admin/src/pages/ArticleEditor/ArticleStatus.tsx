import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

export const ArticleStatus: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>{t("articleStatus")}</h3>
      <Select style={{ width: "100%", display: "block", margin: "0 auto" }}>
        <Option value="draft">{t("draft")}</Option>
        <Option value="publish">{t("publish")}</Option>
      </Select>
    </div>
  );
};
