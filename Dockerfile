# Используем Node.js как базовый образ
FROM node:18

# Рабочая директория в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Делаем shell скрипт исполняемым
RUN chmod +x start.sh

# Открываем порты для фронтенда и бэкенда
EXPOSE 4444
EXPOSE 3000

# Запускаем оба сервиса через shell скрипт
CMD ["./start.sh"]