FROM node:12-alpine as build

WORKDIR /usr/local/comments-svc

COPY dist package.json ./

RUN npm install --production

FROM node:12-alpine

WORKDIR /usr/local/comments-svc

COPY --from=build /usr/local/comments-svc .

EXPOSE 50051

CMD ["node", "main.js"]
