ARG NODE_VERSION=22
ARG APP_DIRNAME=next
ARG PROJECT=@azem/next

# 1. Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine

RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm and turbo on the alpine base
FROM alpine AS base

RUN corepack enable
RUN pnpm config set store-dir ~/.pnpm-store

# 2. Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=${PROJECT} --docker

# 3. Build the project
FROM base AS builder
ARG PROJECT

ENV CI=true
ENV NODE_ENV=production

WORKDIR /app

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .

RUN pnpm build --filter=${PROJECT}

# 4. Final image - runner stage to run the application
FROM base AS runner
ARG APP_DIRNAME
ARG PORT=3000

ENV NODE_ENV=production
ENV PORT=${PORT}

RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 next
USER next

WORKDIR /app

COPY --from=builder --chown=next:node /app .
WORKDIR /app/apps/${APP_DIRNAME}

EXPOSE ${PORT}

CMD ["pnpm", "start"]
