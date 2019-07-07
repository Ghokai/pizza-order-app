### STAGE 1: Build ###
FROM node as build

RUN mkdir /usr/src/client
WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH
COPY ./client/package.json /usr/src/client/package.json

RUN npm install --silent

COPY ./client /usr/src/client
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]