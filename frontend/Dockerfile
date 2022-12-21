FROM node:18.9.0-alpine

WORKDIR /usr/client

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 3001

CMD ["npm", "start"]