import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { RegisterForm } from "../../components/RegisterForm";

export const CreateUser: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);

  return (
    <div style={{ margin: "1em 0" }}>
      <Button type="primary" icon="plus" onClick={() => toggleVisible(true)}>
        {t("create")}
      </Button>
      <Modal
        title={t("createUser")}
        visible={visible}
        footer={null}
        onCancel={() => toggleVisible(false)}
      >
        <RegisterForm
          shouldJumpToLogin={false}
          shouldShowRoleSelect={true}
          renderFooter={({ loading, hasErrors, getFieldsError }) => (
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ marginRight: 8 }}
                onClick={() => toggleVisible(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                loading={loading}
              >
                {t("confirm")}
              </Button>
            </div>
          )}
          onSubmited={() => toggleVisible(false)}
        />
      </Modal>
    </div>
  );
};
