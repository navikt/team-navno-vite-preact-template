FROM node:18-alpine

WORKDIR /app

COPY package*.json .env node_modules /app/
COPY server/dist server/package*.json server/.env server/node_modules /app/server/

EXPOSE 9001
CMD ["npm", "run", "start"]
