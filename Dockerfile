FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

RUN yarn add @nestjs/cli --no-save

COPY . .

RUN yarn build


FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY package.json ./

EXPOSE 5000

CMD ["sh", "-c", "yarn migration:run && yarn start:prod"]
