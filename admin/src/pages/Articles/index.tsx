import React from "react";
import { Search } from "./Search";
import { DataTable } from "./DataTable";

export const Articles: React.FC = () => {
  return (
    <>
      <Search />
      <DataTable />
    </>
  );
};
