const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Создаем директорию для загрузок, если её нет
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
app.use(cors());
app.use(express.json());

// Импорт роутов (будут созданы позже)
const uploadRoute = require('./routes/upload');
const summaryRoute = require('./routes/summary');

app.use('/upload', uploadRoute);
app.use('/send', summaryRoute);

app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log('Текущие настройки:');
  console.log('- BOT_TOKEN:', process.env.BOT_TOKEN ? 'Установлен' : 'Не установлен');
  console.log('- CHAT_ID:', process.env.CHAT_ID ? 'Установлен' : 'Не установлен');
  console.log('- Uploads directory:', uploadsDir);
}); 