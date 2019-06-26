import React from "react";
import { Card, Col } from "antd";

interface IPops extends React.ComponentProps<any> {
  span: number;
}

export const CardContainer: React.FC<IPops> = ({ span, children }) => {
  return (
    <Col span={span}>
      <Card style={{ marginBottom: 24 }}>{children}</Card>
    </Col>
  );
};
