FROM node:12
# 该目录作为主要工作区
WORKDIR /usr/src/app
# 拷贝并运行npm install
COPY package*.json ./
RUN npm install
# node_modules准备就绪 复制代码放入docker容器目录中
COPY . .
RUN npm run build
# 公开端口8080
EXPOSE 8080
CMD [ "npm", "run",'start' ]