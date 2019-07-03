import React from "react";
import { Statistic, Row, Icon } from "antd";
import { CardContainer } from "./CardContainer";
import { LineChart } from "./LineChart";
import { AreaChart } from "./AreaChart";
import { ProgressChart } from "./ProgressChart";

export const DashBoard: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <CardContainer span={12}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </CardContainer>

        <CardContainer span={12}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />
        </CardContainer>

        <CardContainer span={24}>
          <AreaChart />
        </CardContainer>

        <CardContainer span={12}>
          <LineChart />
        </CardContainer>

        <CardContainer span={12}>
          <ProgressChart />
        </CardContainer>
      </Row>
    </>
  );
};
