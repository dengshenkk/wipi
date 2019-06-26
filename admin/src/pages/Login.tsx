import React from "react";
import { Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 20, offset: 2 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 20, offset: 2 },
    sm: { span: 6, offset: 0 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 20,
      offset: 2
    },
    sm: {
      span: 14,
      offset: 10
    }
  }
};

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
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label={t("username")}>
        {getFieldDecorator("username", {
          rules: [{ validator: validateUsername }]
        })(<Input placeholder={t("usernameValidateInfo")} />)}
      </Form.Item>
      <Form.Item label={t("password")}>
        {getFieldDecorator("password", {
          rules: [{ validator: validatePassword }]
        })(<Input type="password" placeholder={t("passwordValidateInfo")} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          {t("login")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Login = Form.create({ name: "login" })(LoginForm);
