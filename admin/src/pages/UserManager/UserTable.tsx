import React from "react";
import { Table, Divider, Popconfirm, Tag, Button } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { IUser, IUserState } from "../../store/modules/user/user.interface";

type Props = {
  fixed?: boolean | "left" | "right";
  render?: Element | React.ReactElement;
};

export const UserTable: React.FC<Props & IUserState> = props => {
  const { users, count } = props;
  const { t } = useTranslation();

  const columns: ColumnProps<IUser>[] = [
    {
      title: t("name"),
      width: 100,
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("role"),
      width: 100,
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "magenta" : "cyan"}>{t(role)}</Tag>
      )
    },
    {
      title: t("createAt"),
      dataIndex: "createAt",
      key: "createAt"
    },

    {
      title: t("updateAt"),
      dataIndex: "updateAt",
      key: "updateAt"
    },

    {
      title: t("lastLoginAt"),
      dataIndex: "lastLoginAt",
      key: "lastLoginAt"
    },

    /** eslint-disable anchor-is-valid */
    {
      title: t("actions"),
      key: "operation",
      render: (user: IUser) => (
        <>
          <Button type="link" onClick={() => console.log(user)}>
            {t("edit")}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={t("areYouSure")}
            okText={t("confirm")}
            cancelText={t("cancel")}
          >
            <Button type="link" onClick={() => console.log(user)}>
              {t("delete")}
            </Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <Table
      style={{ backgroundColor: "#fff" }}
      columns={columns}
      dataSource={users}
      rowKey={"id"}
      pagination={{
        defaultPageSize: 10,
        total: count,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30"]
      }}
    />
  );
};
