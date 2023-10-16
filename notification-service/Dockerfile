FROM node:18-alpine as builder

WORKDIR /app
RUN apk --no-cache add curl
RUN apk --no-cache add jq
COPY ./package.json .
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./.env .
RUN npm install
RUN npm run build

ENV APP_PORT=3001
ENV RABBIT_MQ_CONNECTION_STRING=amqp://rabbitmq
ENV RABBIT_MQ_USER_MESSAGES_QUEUE_NAME=user-queue
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]