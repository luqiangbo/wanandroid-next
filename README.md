### 部署

- 停止容器：docker stop <CONTAINER>
- 删除容器：docker rm <CONTAINER>
- 更新镜像：docker pull <IMAGE>
- 启动容器：docker run <ARG> ... <IMAGE>

```
docker run --name web01 -p 49169:3000 -d caniuse/web:0.0.1
```

### 手动更新

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -cR \
    caniuse/web:0.0.1
```
