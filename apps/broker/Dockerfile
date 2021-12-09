# Inspired by: https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker-quickstart-fr

FROM node:lts-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy workspace config
COPY package.json ./

USER node

# Copy app files
COPY --chown=node:node apps/broker .

RUN yarn install

# MQTT port
EXPOSE 1883

# This does not reload the app when changes are made to the source code.
# Nodemon: https://gist.github.com/ksmithut/e126f7ddb40b760487a17e8b569a77b5
# Yarn Workspace: https://medium.com/@emilefugulin/building-a-sane-docker-image-for-typescript-lerna-and-prisma-2-76d8ff9926e4
CMD [ "yarn", "dev" ]