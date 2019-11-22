FROM node:alpine

RUN apk add --no-cache bash

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./
RUN npm install

# https://stackoverflow.com/a/32785014/232619
COPY . /app

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

EXPOSE 5000
