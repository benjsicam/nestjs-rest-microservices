#!/bin/bash

cd api-gateway && npm run lint && cd -
cd microservices/comments-svc && npm run lint && cd -
cd microservices/organizations-svc && npm run lint && cd -
cd microservices/users-svc && npm run lint && cd -
