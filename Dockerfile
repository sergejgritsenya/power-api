FROM node:13-slim

ENV NODE_ENV=production
ENV POSTGRES_URL="postgresql://"
WORKDIR /app

COPY ./prisma/schema.prisma ./
COPY package.json yarn.lock tsconfig.json /app/

RUN apt-get -qy update && apt-get -qy install openssl
RUN yarn install --production=false --ignore-scripts
RUN yarn global add @prisma/cli

COPY ./src /app/src
COPY ./migration /app/migration

RUN NODE_ENV=development prisma generate
RUN yarn build

EXPOSE 3088

CMD ["yarn", "start"]