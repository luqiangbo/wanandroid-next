### 部署

- 停止容器：docker stop <CONTAINER>
- 删除容器：docker rm <CONTAINER>
- 更新镜像：docker pull <IMAGE>
- 启动容器：docker run <ARG> ... <IMAGE>

```
docker run --name web01 -p 49169:3000 -d caniuse/web:0.0.1
docker build
```

localhost

```
docker build -t local_next .
docker run  -d --name local_next01 -p 43000:3000 -d local_next
```

### 每小时更新一次

```
docker run -d \
    --name watchtower \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -i 3600
```

### 每天凌晨一点更新(北京时间)

```
docker run -d \
    --name watchtower \
    --restart always \
    -e TZ=Asia/Shanghai \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -s "0 0 1 * * *"
```

### watchtower 手动更新

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -cR \
    web01
```

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    --run-once \
    web01
```

> 注意指定容器需填写 容器名 ,并非镜像名.由于部分容器启动时可能没有定义 --name 参数,请执行 docker ps 查询核对容器名.

#### 手动更新所有容器

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    --run-once

```

参考文档 https://www.ioiox.com/archives/84.html
