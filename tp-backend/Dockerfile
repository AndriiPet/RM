# Виберіть базовий образ Node.js
FROM node:18

# Встановіть робочий каталог у контейнері
WORKDIR /usr/src/app

# Копіюйте файл package.json та встановіть залежності
COPY package*.json ./
RUN npm install

# Копіюйте джерельний код вашого додатку в контейнер
COPY . .

# Скомпілюйте додаток
RUN npm run build

# Вкажіть команду для запуску вашого додатку
CMD ["node", "dist/main"]