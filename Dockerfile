FROM node:0.12.7-onbuild

RUN apt-get update -qq && \
    apt-get install -qq build-essential python m4 -y

ENV BLUEBIRD_WARNINGS=0
ENV HOME=/root
ENV PM2_HOME=/etc/.pm2

RUN npm config set registry http://registry.npmjs.org/ && \
    npm install pm2@0.15.10 -g
