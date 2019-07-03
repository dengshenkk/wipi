import React from "react";
import { Row, Col, Input, Icon, Button, Drawer } from "antd";
import { MDEditor } from "./MDEditor";
import { ArticleStatus } from "./ArticleStatus";
import { CoverUpload } from "./CoverUpload";
import { TagsSelect } from "./TagsSelect";

const { TextArea } = Input;

export const ArticleEditor: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Input placeholder="Basic usage" />
          <div style={{ margin: "24px 0" }} />
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
          <div style={{ margin: "24px 0" }} />
          <MDEditor />
        </Col>
      </Row>

      <Button type="primary">
        <Icon type="plus" /> 提交
      </Button>
      <Drawer title="Create a new account" width={360} visible={false}>
        <div>
          <TagsSelect />
          <CoverUpload />
          <ArticleStatus />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right"
          }}
        >
          <Button style={{ marginRight: 8 }}>Cancel</Button>
          <Button type="primary">Submit</Button>
        </div>
      </Drawer>
    </>
  );
};
