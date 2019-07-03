import React from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../components/PageHeader";
import { Search } from "./Search";
import { DataTable } from "./DataTable";

export const Articles: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("articleList")} />

      <div style={{ background: "#fff", padding: 15 }}>
        <Search />
        <DataTable />
      </div>
    </>
  );
};
