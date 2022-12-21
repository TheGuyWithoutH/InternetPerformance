FROM node:18.9.0-alpine

WORKDIR /usr/server

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]