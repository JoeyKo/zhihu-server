FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --quiet

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
