FROM node:12-alpine as builder

ARG PGURL="postgresql://"

# install build deps
RUN apk update && apk add --no-cache --virtual \
    python \
    curl \
    bash \
    make \
    g++
# install prune script
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin 

WORKDIR /usr/src/app
# install packages
COPY package.json yarn.lock ./
RUN yarn
ADD . .
# prisma setup
ENV POSTGRES_URL=$PGURL
COPY ./prisma/schema.prisma ./
RUN yarn global add @prisma/cli
RUN NODE_ENV=development prisma generate
# build project
RUN yarn build

# prunde dev deps
RUN npm prune --production && /usr/local/bin/node-prune 




FROM node:12-alpine
ENV PORT=3000
RUN apk update && apk add curl && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist/
COPY --from=builder /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/node_modules/.prisma ./node_modules/.prisma/

EXPOSE $PORT
CMD ["node","./dist/main.js"]
