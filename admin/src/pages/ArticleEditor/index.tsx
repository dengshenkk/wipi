import React, { useState } from "react";
import { Row, Col, Input, Icon, Button, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../components/PageHeader";
import { MDEditor } from "./MDEditor";
import { ArticleStatus } from "./ArticleStatus";
import { CoverUpload } from "./CoverUpload";
import { TagsSelect } from "./TagsSelect";

const { TextArea } = Input;

export const ArticleEditor: React.FC = () => {
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);

  return (
    <>
      <PageHeader title={t("articleEditor")} />

      <div style={{ background: "#fff", padding: 15 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Input placeholder={t("articleTitle")} />
            <div style={{ margin: "24px 0" }} />
            <TextArea
              placeholder={t("articleSummary")}
              autosize={{ minRows: 2, maxRows: 6 }}
            />
            <div style={{ margin: "24px 0" }} />
            <MDEditor />
          </Col>
        </Row>

        <Button type="primary" onClick={() => toggleVisible(true)}>
          <Icon type="plus" /> {t("submit")}
        </Button>
        <Drawer
          title={t("createArticle")}
          width={360}
          visible={visible}
          closable
          onClose={() => toggleVisible(false)}
        >
          <div>
            <TagsSelect />
            <CoverUpload />
            <ArticleStatus />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary">{t("submit")}</Button>
          </div>
        </Drawer>
      </div>
    </>
  );
};
