FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x start.sh

EXPOSE 4444
EXPOSE 3000

CMD ["./start.sh"]