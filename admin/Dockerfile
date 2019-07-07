FROM node:12

WORKDIR /usr/plarum/admin

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build
