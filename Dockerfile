FROM node:18-alpine

WORKDIR /app

ARG PORT

COPY package*.json .env node_modules /app/
COPY server/dist server/package*.json server/node_modules /app/server/

EXPOSE $PORT
CMD ["npm", "run", "start"]
