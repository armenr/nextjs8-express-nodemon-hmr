FROM node:10.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run setup

ENTRYPOINT [ "npm", "run"]
CMD [ "dev:nodemon" ]
