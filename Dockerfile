ARG NODE_VERSION=20.11.0
# Paso 1: Construir la aplicación React en un entorno Node
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --omit=dev

COPY . .

RUN npm install -g serve
RUN npm run build

USER node

EXPOSE 3000
#CMD npm start
CMD serve -s build
