#!/bin/bash

cd api-gateway && npm i && cd -
cd microservices/comments-svc && npm i && cd -
cd microservices/organizations-svc && npm i && cd -
cd microservices/users-svc && npm i && cd -
