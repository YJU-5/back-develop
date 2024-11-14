# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# npm install 실행
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
