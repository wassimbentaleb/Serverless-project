FROM node:16

WORKDIR /app
RUN apt-get update; apt-get -y install default-jre

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run dynamo

CMD ["npm", "start"]