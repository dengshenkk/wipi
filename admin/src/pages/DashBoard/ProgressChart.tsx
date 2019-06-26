import React from "react";
import { Chart, Gauge } from "cat-charts-react";

export const ProgressChart: React.FC = () => {
  const data = [
    {
      value: 70
    }
  ];
  const dataFields = {
    value: "value"
  };
  const size = ["100%", 400];
  const forceFit = true;

  const style = {
    title: { fontSize: 16, color: "#333" },
    tickLine: false,
    tickText: false
  };

  return (
    <Chart data={data} dataFields={dataFields} size={size} forceFit={forceFit}>
      <Gauge
        {...{
          min: 0,
          max: 100,
          lineWidth: 10,
          startAngle: 0,
          endAngle: Math.PI * 2,
          title: (d: { value: any }) => `${d.value}%`,
          subTitle: false
        }}
        style={style}
      />
    </Chart>
  );
};
