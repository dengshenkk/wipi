import React from "react";
import { List } from "antd";
import { IArticle } from "../../store/modules/article/article.interface";

type Props = {
  articles: IArticle[];
};

export const ArticleList = (props: Props) => {
  const { articles } = props;

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }}
      dataSource={articles}
      renderItem={(article: IArticle) => (
        <List.Item
          key={article.title}
          actions={
            [
              // <IconText type="star-o" text="156" />,
              // <IconText type="like-o" text="156" />,
              // <IconText type="message" text="2" />,
            ]
          }
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title={article.title}
            description={article.summary}
          />
          {article.content}
        </List.Item>
      )}
    />
  );
};
