FROM node

WORKDIR /usr/server

COPY server/package*.json ./

RUN npm install

COPY /server .

RUN npm run tsc

WORKDIR ./build

CMD node main.js