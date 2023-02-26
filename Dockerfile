FROM node:18-alpine

WORKDIR /app

COPY package*.json .env /app/
COPY node_modules /app/node_modules/
COPY server/dist /app/dist/

EXPOSE 9001
CMD ["npm", "run", "start"]
