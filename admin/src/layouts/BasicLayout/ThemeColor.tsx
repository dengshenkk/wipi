import React, { useState, useEffect } from "react";
import { Avatar, message, Typography } from "antd";

declare let less: any;

const lessModifyColorVars = (color: string) => {
  let vars = {
    "@primary-color": color,
    "@btn-primary-bg": color
  };

  return less
    .modifyVars(vars)
    .then(() => Promise.resolve())
    .catch((error: any) => {
      message.error("更换主题失败");
      return Promise.reject();
    });
};

const colors = [
  "rgb(24, 144, 255)",
  "rgb(245, 34, 45)",
  "rgb(250, 84, 28)",
  "rgb(250, 173, 20)",
  "rgb(19, 194, 194)",
  "rgb(82, 196, 26)",
  "rgb(47, 84, 235)"
];

export const ThemeColor: React.FC = () => {
  const [currentColor, setCurrentColor] = useState(
    window.localStorage.getItem("currentColor") || colors[0]
  );

  const changeColor = (color: string) => {
    lessModifyColorVars(color).then(() => {
      window.localStorage.setItem("currentColor", color);
      setCurrentColor(color);
    });
  };

  useEffect(() => {
    let color = window.localStorage.getItem("currentColor");
    if (color) {
      lessModifyColorVars(color);
    }
  }, []);

  return (
    <>
      <Typography.Paragraph>主题色</Typography.Paragraph>
      <div>
        {colors.map((color, i) => (
          <div
            style={{ display: "inline-block" }}
            key={color}
            onClick={() => {
              changeColor(color);
            }}
          >
            <Avatar
              style={{ marginLeft: i > 0 ? 8 : 0, background: color }}
              shape="square"
              size={"small"}
              icon={currentColor === color ? "check" : undefined}
            />
          </div>
        ))}
      </div>
    </>
  );
};
