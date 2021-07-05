FROM node:14-alpine

COPY . /app
WORKDIR /app

ENV NODE_ENV "production"

RUN yarn install --production=false \
    && yarn build

RUN rm -rf node_modules \
    && rm -rf src \
    && yarn install --production=true

CMD ["yarn", "start"]
