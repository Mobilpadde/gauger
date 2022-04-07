FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "serve"]