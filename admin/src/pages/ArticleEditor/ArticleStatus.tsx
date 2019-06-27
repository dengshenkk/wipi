import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const ArticleStatus: React.FC = () => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>Status</h3>
      <Select
        defaultValue="lucy"
        style={{ width: "100%", display: "block", margin: "0 auto" }}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </div>
  );
};
