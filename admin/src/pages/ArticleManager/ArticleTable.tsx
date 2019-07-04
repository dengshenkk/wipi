import React from "react";
import { Table, Divider, Popconfirm, Button, Tag, Typography } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import {
  IArticle,
  IArticleState
} from "../../store/modules/article/article.interface";
import { ITag } from "../../store/modules/tag/tag.interface";

type Props = {
  loading: boolean;
  fixed?: boolean | "left" | "right";
  render?: Element | React.ReactElement;
  updateArticle: Function;
  deleteArticle: Function;
} & IArticleState;

export const ArticleTable: React.FC<Props> = props => {
  const { articles, loading, updateArticle, deleteArticle } = props;
  const { t } = useTranslation();

  const columns: ColumnProps<IArticle>[] = [
    {
      title: t("articleTitle"),
      width: 100,
      dataIndex: "title",
      key: "title"
    },

    {
      title: t("articleTags"),
      dataIndex: "tags",
      key: "tags",
      render: (tags: ITag[] = []) => (
        <>
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.label}</Tag>
          ))}
        </>
      )
    },

    {
      title: t("articleStatus"),
      width: 100,
      dataIndex: "status",
      key: "status",
      render: status => <>{t(status)}</>
    },

    {
      title: t("createAt"),
      width: 100,
      dataIndex: "createAt",
      key: "createAt"
    },

    {
      title: t("updateAt"),
      width: 100,
      dataIndex: "updateAt",
      key: "updateAt"
    },

    {
      title: t("actions"),
      key: "operation",
      render: (article: IArticle) => (
        <>
          <Button
            type="link"
            onClick={() => {
              updateArticle(article);
            }}
          >
            {t("edit")}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={t("areYouSure")}
            okText={t("confirm")}
            cancelText={t("cancel")}
            onConfirm={() => deleteArticle(article.id)}
          >
            <Button type="link">{t("delete")}</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <>
      <Table
        style={{ backgroundColor: "#fff" }}
        columns={columns}
        dataSource={articles}
        loading={loading}
        rowKey={"id"}
        expandedRowRender={(article: IArticle) => (
          <>
            <Typography.Paragraph>{article.content}</Typography.Paragraph>
            {article.author ? (
              <Typography.Paragraph>{article.author.name}</Typography.Paragraph>
            ) : null}
          </>
        )}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "30"]
        }}
      />
    </>
  );
};
