FROM node:18.9.0-alpine as client

WORKDIR /usr/app/client

COPY package*.json ./
RUN npm install -qy

COPY frontend/ ./
RUN npm run build

FROM node:18.9.0-alpine

WORKDIR /usr/app/

COPY package*.json ./
RUN npm install -qy

COPY server/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]