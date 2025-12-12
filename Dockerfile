FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:lts-alpine
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package*.json pnpm-*.yaml ./
COPY patches ./patches
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/dist ./dist

CMD ["pnpm", "start"]