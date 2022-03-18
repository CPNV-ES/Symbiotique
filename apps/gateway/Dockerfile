FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --chown=node:node apps/gateway .

RUN yarn install

EXPOSE 8080

CMD [ "yarn", "start" ]