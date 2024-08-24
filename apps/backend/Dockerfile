FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

COPY ./src ./src
COPY ./libs ./libs
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN pnpm build


FROM node:20-alpine
ENV NODE_ENV=production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod

COPY --from=build /app/dist ./dist

ENV TZ=Asia/Seoul
CMD [ "node", "dist/main"]
