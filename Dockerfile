# build stage
FROM node:18.17.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn
RUN yarn install

COPY . .

RUN yarn build

# production stage
FROM node:18.17.0-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install -g yarn
RUN yarn install --production
RUN rm package*.json

EXPOSE 3000

CMD ["yarn", "start:prod"]