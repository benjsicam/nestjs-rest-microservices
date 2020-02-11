FROM node:12-alpine as build

WORKDIR /usr/local/users-svc

COPY dist package.json ./

RUN npm install --production

FROM node:12-alpine

WORKDIR /usr/local/users-svc

COPY --from=build /usr/local/users-svc .

EXPOSE 50051

CMD ["node", "main.js"]
