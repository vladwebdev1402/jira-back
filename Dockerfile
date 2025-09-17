FROM node:22

WORKDIR /app

EXPOSE 5000

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

CMD ["yarn", "start:dev"]
