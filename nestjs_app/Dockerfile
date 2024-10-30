FROM node:22 as build

WORKDIR /

COPY . ./

RUN npm install
RUN npm run build

RUN npm install --omit=dev

FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY nest-cli.json ./
COPY --from=build dist ./dist
COPY --from=build node_modules ./node_modules

EXPOSE 3000

CMD npm run start:prod
