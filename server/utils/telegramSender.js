require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// Получаем переменные окружения
const BOT_TOKEN = process.env.BOT_TOKEN || '8150704344:AAER10PCnvKzLCEUuBmCRQrvfve_6rLd-L4';
const CHAT_ID = process.env.CHAT_ID || '-4714804475';

function printEnvAndParams(filePath, caption, fileName, mimeType) {
  console.log('================= DIAGNOSTICS =================');
  console.log('Дата и время:', new Date().toISOString());
  console.log('BOT_TOKEN:', BOT_TOKEN ? BOT_TOKEN.slice(0, 10) + '...' : 'NOT SET');
  console.log('CHAT_ID:', CHAT_ID);
  console.log('filePath:', filePath);
  console.log('fileName:', fileName);
  console.log('caption:', caption);
  console.log('mimeType:', mimeType);
  if (filePath && fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log('fileSize:', stats.size, 'bytes');
    console.log('file created:', stats.birthtime);
    console.log('file modified:', stats.mtime);
  } else {
    console.log('filePath does not exist!');
  }
  console.log('================================================');
}

async function sendDocument(filePath, caption, fileName = 'document.jpg') {
  // Проверка существования файла
  if (!filePath) {
    console.error('filePath is undefined!');
    throw new Error('filePath is undefined!');
  }
  if (!fs.existsSync(filePath)) {
    console.error('Файл не найден:', filePath);
    throw new Error('Файл не найден: ' + filePath);
  }
  if (!fileName) {
    console.error('fileName is undefined!');
    throw new Error('fileName is undefined!');
  }

  // Получаем расширение файла
  const ext = path.extname(fileName);
  const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
                   ext === '.png' ? 'image/png' : 
                   ext === '.pdf' ? 'application/pdf' : 
                   'application/octet-stream';

  printEnvAndParams(filePath, caption, fileName, mimeType);

  try {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('caption', caption);

    // Читаем файл как поток и добавляем в форму
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', (err) => {
      console.error('Ошибка чтения файла:', err);
    });

    form.append('document', fileStream, {
      filename: fileName,
      contentType: mimeType
    });

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
    console.log('POST URL:', url);
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 15000 // 15 секунд
    });

    console.log('Ответ от Telegram:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка Telegram API:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}

async function sendMessage(text) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML'
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка Telegram API:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}

module.exports = { sendDocument, sendMessage }; 