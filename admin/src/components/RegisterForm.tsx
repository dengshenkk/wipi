import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { message, Form, Input, Icon, Modal, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IState } from "../store";
import { register } from "../store/modules/user/user.reducer";

type StateProps = {
  loading: boolean;
};

type DispatchProps = {
  register: Function;
};

type OwnProps = {
  // 组件自身
  shouldJumpToLogin?: boolean;
  shouldShowRoleSelect?: boolean;
  onSubmited?: Function;
  renderFooter?: (
    arg: StateProps & { getFieldsError: Function; hasErrors: Function }
  ) => React.ReactElement;
};

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: IState): StateProps => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({ register }, dispath);

const BaseForm: React.FC<Props & FormComponentProps & RouteComponentProps> = (
  props: Props & FormComponentProps & RouteComponentProps
) => {
  const { t } = useTranslation();
  const {
    loading,
    form,
    history,
    register,
    renderFooter,
    shouldJumpToLogin,
    shouldShowRoleSelect,
    onSubmited
  } = props;
  const { getFieldDecorator, getFieldsError, resetFields } = form;

  function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
  }

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

  const compareToFirstPassword = (
    rule: any,
    value: string,
    callback: Function
  ) => {
    if (value && value === form.getFieldValue("password")) {
      callback();
    } else {
      callback(t("twoPasswordNotEqual"));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        register &&
          register(values)
            .then(() => {
              if (shouldJumpToLogin) {
                Modal.confirm({
                  title: t("registerSuccessMsg"),
                  content: t("registerSuccessHelpMsg"),
                  onOk() {
                    history.replace({ pathname: "/login" });
                  },
                  okText: t("confirm"),
                  cancelText: t("cancel")
                });
              } else {
                message.success(t("registerSuccessMsg"));
              }

              resetFields();
              onSubmited && onSubmited();
            })
            .catch(() => {
              message.error(t("registerFailMsg"));
            });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [{ validator: validateUsername }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={t("username")}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ validator: validatePassword }]
        })(
          <Input.Password
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={t("password")}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("confirm", {
          rules: [{ validator: compareToFirstPassword }]
        })(
          <Input.Password
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={t("confirmPassword")}
          />
        )}
      </Form.Item>
      {shouldShowRoleSelect ? (
        <Form.Item>
          {getFieldDecorator("role")(
            <Select placeholder={t("assignUserRole")}>
              <Select.Option value="normal">{t("normal")}</Select.Option>
              <Select.Option value="admin">{t("admin")}</Select.Option>
            </Select>
          )}
        </Form.Item>
      ) : null}
      {renderFooter && renderFooter({ loading, getFieldsError, hasErrors })}
    </Form>
  );
};

// connect<StateProps, DispatchProps, OwnProps, ReduxState>
// 见 issues: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16990
export const RegisterForm: React.ComponentType<OwnProps> = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  IState
>(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "register" })(withRouter(BaseForm)));
