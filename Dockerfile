FROM node:18-alpine3.16 AS base

# INSTALL DEPENDENCIES FOR DEVELOPMENT (FOR NEST)
FROM base AS deps
WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock .env ./
COPY --chown=node:node prisma ./prisma
RUN yarn --frozen-lockfile;

USER node

# INSTALL DEPENDENCIES & BUILD FOR PRODUCTION
FROM base AS build
WORKDIR /usr/src/app

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=deps /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=deps /usr/src/app/.env ./
COPY --chown=node:node . .
ENV NODE_ENV production

RUN yarn prisma generate;\
    yarn build;\
    yarn --frozen-lockfile --production; \
    rm -rf ./.next/cache;

USER node

# PRODUCTION IMAGE
FROM base AS production
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env ./
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma


ENV SEED false

EXPOSE 8000

CMD [ "yarn", "start:docker" ]