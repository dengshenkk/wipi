FROM node:12

WORKDIR /usr/plarum/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf ./src

EXPOSE 4000

CMD ["npm", "start"]
