#!/bin/bash

docker run --rm \
  -v $PWD/docs:/out \
  -v $PWD/_proto:/protos \
  pseudomuto/protoc-gen-doc --doc_opt=markdown,proto-docs.md
