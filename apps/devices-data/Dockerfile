FROM node:lts

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --only=development

COPY apps/devices-data .

RUN yarn run build