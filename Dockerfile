FROM node:16.14.0-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build
RUN npm install pm2 -g

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]
