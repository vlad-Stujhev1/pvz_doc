# Инструкция по работе с приложением "Архив документов ПВЗ"

## Оглавление
1. Описание приложения
2. Быстрый старт
3. Развёртывание backend (Node.js)
4. Развёртывание frontend (Netlify)
5. Настройка переменных окружения
6. Работа с приложением
7. FAQ и советы

---

## 1. Описание приложения

Приложение предназначено для загрузки документов (фото, PDF) и отправки итогов смены в Telegram-чат через Telegram-бота. Поддерживает хранение истории, отправку отчётов с ФИО и никнеймом оператора.

---

## 2. Быстрый старт

### Запуск сервера (backend)

1. Откройте терминал/командную строку.
2. Перейдите в папку с сервером:
   ```
   cd путь_к_проекту/server
   ```
3. Установите зависимости (только при первом запуске или после обновления зависимостей):
   ```
   npm install
   ```
4. Создайте файл `.env` на основе `.env.example` и укажите свои значения:
   ```
   BOT_TOKEN=ваш_токен_бота
   CHAT_ID=ваш_chat_id
   ```
5. Запустите сервер:
   ```
   node index.js
   ```
6. В консоли должно появиться сообщение:
   ```
   Сервер запущен на порту 4000
   Текущие настройки:
   - BOT_TOKEN: Установлен
   - CHAT_ID: Установлен
   - Uploads directory: ...
   ```
7. Сервер готов к работе!

---

## 3. Развёртывание backend (Node.js)

- Backend размещается отдельно (например, на Render, Railway, Heroku, VPS).
- После деплоя получите публичный URL (например, https://your-backend.onrender.com).
- Проверьте, что сервер принимает запросы и отправляет сообщения в Telegram.

---

## 4. Развёртывание frontend (Netlify)

1. Зарегистрируйтесь на [Netlify](https://app.netlify.com).
2. Загрузите папку с frontend (или index.html) через drag&drop или GitHub.
3. После деплоя получите ссылку вида https://your-app.netlify.app.
4. В настройках Telegram-бота укажите эту ссылку для WebApp.
5. В коде frontend укажите адрес backend (не localhost, а публичный URL).

---

## 5. Настройка переменных окружения

В файле `.env` (в папке server):
```
BOT_TOKEN=ваш_токен_бота
CHAT_ID=ваш_chat_id
```

В frontend (если используется React/Vue):
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 6. Работа с приложением

- Загрузите фото/документ, выберите тип, введите подпись и отправьте.
- В блоке "Итог смены" заполните ФИО, Telegram-никнейм, суммы и отправьте итог смены.
- Все отчёты и документы будут отправлены в Telegram-чат.
- История последних отправок отображается в приложении.

---

## 7. FAQ и советы

- **Ошибка соединения:** Проверьте, что backend доступен по публичному адресу.
- **Не отправляется в Telegram:** Проверьте токен и chat_id, права бота в чате.
- **Не отображается история:** Проверьте работу localStorage в браузере.
- **Изменился формат отчёта:** Меняйте только backend, фронт не требует изменений.

---
