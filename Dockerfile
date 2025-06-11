# syntax=docker/dockerfile:1
# Dockerfile (Development)


ARG NODE_VERSION=22.14.0
ARG PNPM_VERSION=10.10.0


FROM node:${NODE_VERSION}-alpine

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION} @angular/cli

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

COPY . .

EXPOSE 4444

CMD ["pnpm", "start", "--host", "0.0.0.0", "--port", "3333", "--disable-host-check"]
