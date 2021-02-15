FROM node:12 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN yarn build

FROM node:12

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/migration ./migration

EXPOSE 3088
CMD ["node","./dist/main.js"]
