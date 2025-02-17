FROM node:18-alpine

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

EXPOSE 5173

WORKDIR /app

COPY package*.json ./

RUN mkdir -p /app/node_modules
RUN chown -R node:node /app/node_modules

RUN npm install

CMD ["npm", "run", "dev"]