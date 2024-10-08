# Stage 1: Build the React app
FROM node:20-alpine AS build

# Установить рабочую директорию
WORKDIR /app

# Копировать package.json и package-lock.json
COPY package.json package-lock.json ./

# Установить зависимости
RUN npm install

# Копировать остальные файлы приложения
COPY . ./

# Собрать приложение
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:1.21-alpine

# Копировать собранные файлы в директорию Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копировать пользовательскую конфигурацию Nginx (для обработки маршрутизации)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открыть порт 80
EXPOSE 80

# Запустить Nginx
CMD ["nginx", "-g", "daemon off;"]
