import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import { Search } from "./Search";
import { DataTable } from "./DataTable";

export const Articles: React.FC = () => {
  return (
    <BasicLayout>
      <Search />
      <DataTable />
    </BasicLayout>
  );
};
