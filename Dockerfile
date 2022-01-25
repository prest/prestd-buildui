FROM node:14-alpine

COPY . /app
WORKDIR /app

ENV NODE_ENV "production"

RUN yarn install --production=false \
    && yarn build && \
    rm -rf /app/node_modules \
    && rm -rf /app/src \
    && yarn install --production=true

CMD ["yarn", "start", "-p", "3001"]
EXPOSE 3001
