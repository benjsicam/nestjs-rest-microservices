#!/bin/bash

cd api-gateway && npm run build && cd -
cd microservices/comments-svc && npm run build && cd -
cd microservices/organizations-svc && npm run build && cd -
cd microservices/users-svc && npm run build && cd -
