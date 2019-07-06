import React from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import { PageHeader } from "../../components/PageHeader";
import { IState } from "../../store";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state: IState) => ({
  currentUser: state.user.currentUser
});

type Props = ReturnType<typeof mapStateToProps>;

export const BaseComponent: React.FC<Props> = (props: Props) => {
  const { currentUser } = props;
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t("dashBoard")}
        subTitle={"Hi, " + (currentUser && currentUser.name)}
      />

      <Row gutter={16}>工作台 待完工......</Row>
    </>
  );
};

export const DashBoard = connect(
  mapStateToProps,
  null
)(BaseComponent);
