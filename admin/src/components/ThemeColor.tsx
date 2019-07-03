import React, { useState, useEffect } from "react";
import { Avatar, message, Typography } from "antd";
import { useTranslation } from "react-i18next";

declare let less: any;

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
  const { t } = useTranslation();
  const lessModifyColorVars = (color: string) => {
    const hide = message.loading(t("compilingTheme"), 0);

    let vars = {
      "@primary-color": color,
      "@btn-primary-bg": color
    };

    return less
      .modifyVars(vars)
      .then(() => Promise.resolve())
      .catch((error: any) => {
        message.error(t("compileThemeFailed"));
        return Promise.reject();
      })
      .finally(hide);
  };
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
    if (color && color !== currentColor) {
      lessModifyColorVars(color);
    }
  }, []);

  return (
    <>
      <Typography.Paragraph>{t("themeColor")}</Typography.Paragraph>
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
