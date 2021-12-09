FROM node:lts

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --only=development

COPY apps/auth .

EXPOSE 3000
EXPOSE 9229

RUN yarn run build