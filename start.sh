#!/bin/bash

# Функция для обработки сигналов завершения
cleanup() {
    echo "Завершение работы..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait
    exit 0
}

# Обработчики сигналов
trap cleanup SIGTERM SIGINT

echo "Запуск приложения..."

# Запускаем бэкенд в фоне
echo "Запускаем бэкенд на порту 3000..."
npm run server &
BACKEND_PID=$!

# Ждем немного чтобы бэкенд успел запуститься
sleep 3

# Запускаем фронтенд в фоне
echo "Запускаем фронтенд на порту 4444..."
npm start &
FRONTEND_PID=$!

echo "Бэкенд PID: $BACKEND_PID"
echo "Фронтенд PID: $FRONTEND_PID"
echo "Приложение запущено!"
echo "Фронтенд: http://localhost:4444"
echo "Бэкенд: http://localhost:3000"

# Ждем завершения любого из процессов
wait 