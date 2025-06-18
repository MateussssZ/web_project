FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Создаем папку для БД
RUN mkdir -p /data

ENV SQLITE_PATH=/data/database.sqlite

EXPOSE 3000

CMD ["npm", "run", "dev"]