const express = require('express');
const router = express.Router();
const { sendMessage } = require('../utils/telegramSender');

// POST /send/summary
router.post('/summary', async (req, res) => {
  const { toReceive, received, cash, encashment, remainder, fio, tgNick } = req.body;
  if (!toReceive || !received || !cash || !fio || !tgNick) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }
  const date = new Date().toLocaleDateString('ru-RU');
  const text =
    `📅Дата: ${date}\n` +
    `Смена: ${fio}\n` +
    `${tgNick}\n` +
    `____________________\n` +
    `📦 К приёмке: ${toReceive}\n` +
    `✅ Принято: ${received}\n` +
    `______________________\n` +
    `💰 Касса: ${cash} ₽\n` +
    `💸 Инкассация: ${encashment || 0} ₽\n` +
    `💼 Остаток: ${remainder || 0} ₽`;
  try {
    await sendMessage(text);
    res.json({ success: true });
  } catch (e) {
    console.error('Ошибка отправки отчёта в Telegram:', e);
    res.status(500).json({ success: false, error: 'Ошибка отправки в Telegram' });
  }
});

module.exports = router; 