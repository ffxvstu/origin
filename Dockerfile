FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=prod

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

USER node

EXPOSE 8080

CMD ["node", "src/server.js"]
