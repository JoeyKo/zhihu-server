FROM node:alpine

RUN apk add --no-cache bash

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY oxe2ynwaf733uze
ENV PM2_SECRET_KEY gqni1snoxw4f5qi

WORKDIR /app

COPY package*.json ./
RUN npm install

# https://stackoverflow.com/a/32785014/232619
COPY . /app

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

EXPOSE 5000
