FROM node:14

COPY . /app
WORKDIR /app
ENV NODE_ENV "production"
EXPOSE 3001

RUN yarn install

CMD ["yarn", "dev", "-p", "3001"]
