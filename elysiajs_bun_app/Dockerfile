ARG BUN_VERSION=latest

FROM oven/bun:${BUN_VERSION}

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --production

COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "prod"]