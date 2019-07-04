import React from "react";
import { Button, Typography } from "antd";

type Props = {
  title?: string | number;
  subTitle?: string;
  children?: React.ReactNode;
};

export const Result: React.FC<Props> = (props: Props) => {
  const { title, subTitle, children } = props;

  return (
    <div className="result">
      <div className="result-image">{children}</div>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph>{subTitle}</Typography.Paragraph>
      <div className="result-extra">
        <Button>Back Home</Button>
      </div>
    </div>
  );
};
