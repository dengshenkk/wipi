import React from "react";
import { Row, Col, Input, Button } from "antd";
import { Select } from "antd";

const { Option } = Select;

const children: React.ReactElement[] = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value: string) {
  console.log(`selected ${value}`);
}

export const Search: React.FC = () => {
  return (
    <Row style={{ padding: "15px 0" }}>
      <Col xs={24} sm={8}>
        <Input.Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
        />
      </Col>

      <Col xs={24} sm={8}>
        <Select
          mode="tags"
          style={{
            width: "100%",
            minWidth: 200,
            maxWidth: 400
          }}
          placeholder="Tags Mode"
          onChange={handleChange}
        >
          {children}
        </Select>
      </Col>

      <Col xs={24} sm={8}>
        <Button type="primary">Search</Button>
        <Button type="default">Reset</Button>

        <Button type="default">Create</Button>
      </Col>
    </Row>
  );
};
