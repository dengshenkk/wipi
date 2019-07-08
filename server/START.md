# server

## 数据库

服务端采用数据库 `postgresql`。在启动服务之前，请确保：

1. 数据库 `postgresql` 可连接
2. 用户名和密码正确
3. 目标数据库已创建

### 使用 docker 创建 `postgresql` 数据库服务

首先启动 `postgresql` 服务：

```shell
docker container run -d -p 5432:5432 --name postgres postgres:11-alpine
```

然后进入启动的数据库服务，进行用户和数据库的创建：

```shell
docker container exec -it postgres bash

# 切换到 postgres
su - postgres

# 输入 psql
psql

# 创建用户
create user plarum with password 'plarum';

# 创建数据库
create database plarum owner plarum;
```
