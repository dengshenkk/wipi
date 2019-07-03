import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";

type Props = {
  name?: string;
  value?: string;
  onSubmit: Function;
  renderFooter?: (arg: {
    getFieldsError: Function;
    hasErrors: Function;
  }) => React.ReactElement;
};

const BaseComponent: React.FC<Props & FormComponentProps> = (
  props: Props & FormComponentProps
) => {
  const { t } = useTranslation();
  const { form, name, value, onSubmit, renderFooter } = props;
  const { getFieldDecorator, getFieldsError, resetFields } = form;

  function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label={t("tagName")}>
        {getFieldDecorator(
          "name",
          Object.assign(
            {
              rules: [{ required: true, message: "Please input tag name!" }]
            },
            name ? { initialValue: name } : {}
          )
        )(<Input placeholder={t("tagName")} />)}
      </Form.Item>
      <Form.Item label={t("tagValue")}>
        {getFieldDecorator(
          "value",
          Object.assign(
            {
              rules: [{ required: true, message: "Please input tag value!" }]
            },
            value ? { initialValue: value } : {}
          )
        )(<Input placeholder={t("tagValue")} />)}
      </Form.Item>
      {renderFooter && renderFooter({ getFieldsError, hasErrors })}
    </Form>
  );
};

export const TagForm = Form.create<Props & FormComponentProps>({
  name: "tagForm"
})(BaseComponent);
