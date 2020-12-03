FROM node:15-alpine as BUILD_IMAGE

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm i

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
######
FROM node:15-alpine

RUN mkdir -p /usr/src/app1
WORKDIR /usr/src/app1

COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/.next ./.next
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json

EXPOSE 3000

# Running the app
CMD npm start