import React, { useEffect, useState, ReactType } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import {
  Statistic,
  Row,
  Icon,
  Table,
  Pagination,
  Divider,
  Popconfirm
} from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ColumnProps } from "antd/lib/table";
import { BasicLayout } from "../layouts/BasicLayout";
import { IState } from "../store";
import { fetchUsers } from "../store/modules/user/user.reducer";

interface IUser {
  id: string;
  name: string;
  role: string;
  createAt: "string";
  updateAt: "string";
  lastLoginAt: "string";
  fixed?: boolean | "left" | "right";
  render?: Element | React.ReactElement;
}

const columns: ColumnProps<IUser>[] = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name"
  },
  {
    title: "role",
    width: 100,
    dataIndex: "role",
    key: "role"
  },
  {
    title: "createAt",
    // width: 100,
    dataIndex: "createAt",
    key: "createAt"
  },

  {
    title: "updateAt",
    // width: 100,
    dataIndex: "updateAt",
    key: "updateAt"
  },

  {
    title: "lastLoginAt",
    // width: 100,
    dataIndex: "lastLoginAt",
    key: "lastLoginAt"
  },
  {
    title: "Action",
    key: "operation",
    // fixed: "right",
    // width: 100,
    render: (user: IUser) => (
      <>
        <a href="javascript:;" onClick={() => console.log(user)}>
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
          <a href="javascript:;">删除</a>
        </Popconfirm>
      </>
    )
  }
];

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading,
  users: state.user.users,
  count: state.user.count
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchUsers }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchUsers: Function;
    users?: IUser[];
    count?: number;
  };

const UsersComponent: React.FC<Props> = props => {
  const { fetchUsers, users, count } = props;

  useEffect(() => {
    console.log("组件装载");
    fetchUsers();
    return () => {
      console.log("组件卸载");
    };
  }, []);

  return (
    <BasicLayout>
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
    </BasicLayout>
  );
};

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent);
