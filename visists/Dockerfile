FROM node:alpine
RUN  apk add --update redis
WORKDIR /usr/app
COPY ./package.json ./
RUN  npm install
COPY ./ ./
CMD ["npm","start"]
