import React from "react";
import { Form, Input, Button, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
}

interface IProps extends FormComponentProps {}

const LoginForm = (props: IProps) => {
  const { t } = useTranslation();
  const { form } = props;
  const { getFieldDecorator, getFieldsError } = form;

  const validateUsername = (rule: any, value: string, callback: Function) => {
    if (value && value.length >= 4 && value.length <= 16) {
      callback();
    } else {
      callback(t("usernameValidateInfo"));
    }
  };

  const validatePassword = (rule: any, value: string, callback: Function) => {
    if (value && value.length >= 6) {
      callback();
    } else {
      callback(t("passwordValidateInfo"));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <UserLayout>
      <div
        style={{
          width: "96%",
          maxWidth: 368
        }}
      >
        <h2>{t("login")}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ validator: validateUsername }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("usernameValidateInfo")}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ validator: validatePassword }]
            })(
              <Input.Password
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("password")}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              style={{ width: "100%" }}
            >
              {t("login")}
            </Button>
            Or <Link to="/register">{t("register")}</Link>
          </Form.Item>
        </Form>
      </div>
    </UserLayout>
  );
};

export const Login = Form.create({ name: "login" })(LoginForm);
