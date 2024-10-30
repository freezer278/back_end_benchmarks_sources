FROM node:22 AS build

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

RUN npm install --omit=dev

FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY --from=build /app/build ./
COPY --from=build /app/node_modules ./node_modules

ENV TZ="UTC"
ENV PORT="3000"
ENV HOST="0.0.0.0"
ENV LOG_LEVEL="debug"
ENV APP_KEY="z7jzTaA8UaRuby4_teEJYZ-95y8heAqq"
ENV NODE_ENV="production"
ENV DB_HOST="127.0.0.1"
ENV DB_PORT="3306"
ENV DB_USER="root"
ENV DB_PASSWORD="root"
ENV DB_DATABASE="app"

EXPOSE 8080
EXPOSE 3000

CMD node bin/server.js
