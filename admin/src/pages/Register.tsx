import React from "react";
import { Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  const { t } = useTranslation();

  return (
    <UserLayout>
      <div
        style={{
          width: "96%",
          maxWidth: 368
        }}
      >
        <h2>{t("register")}</h2>
        <RegisterForm
          shouldJumpToLogin={true}
          shouldShowRoleSelect={false}
          renderFooter={({ loading, hasErrors, getFieldsError }) => (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                style={{ width: "100%" }}
                loading={loading}
              >
                {t("register")}
              </Button>
              Or <Link to="/login">{t("login")}</Link>
            </Form.Item>
          )}
        />
      </div>
    </UserLayout>
  );
};
