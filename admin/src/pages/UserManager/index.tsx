import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { BasicLayout } from "../../layouts/BasicLayout";
import { IState } from "../../store";
import { fetchUsers } from "../../store/modules/user/user.reducer";
import { IUser } from "../../store/modules/user/user.interface";
import { CreateUser } from "./CreateUser";
import { UserTable } from "./UserTable";

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
  const { t } = useTranslation();
  const { fetchUsers, users, count } = props;

  useEffect(() => {
    console.log("组件装载");
    fetchUsers();

    return () => {
      console.log("组件卸载");
    };
  }, [fetchUsers]);

  return (
    <BasicLayout>
      <div style={{ background: "#fff", padding: 15 }}>
        <CreateUser />
        <UserTable users={users} count={count} />
      </div>
    </BasicLayout>
  );
};

export const UserManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent);
