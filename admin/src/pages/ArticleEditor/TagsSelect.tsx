import React from "react";
import { Input, Icon, Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

export const TagsSelect: React.FC = () => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>Tags</h3>
      <CheckboxGroup options={plainOptions} style={{ marginBottom: 15 }} />
      <Input addonAfter={<Icon type="plus" />} defaultValue="mysite" />
    </div>
  );
};
