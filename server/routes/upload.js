const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { sendDocument } = require('../utils/telegramSender');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/app', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  const { signature, docType } = req.body;
  if (!signature || !docType) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }
  const caption = `Документ: ${req.file.originalname}\n#${docType}_\nПодпись: ${signature}`;
  const fileName = req.file.originalname || 'document.jpg';
  try {
    await sendDocument(req.file.path, caption, fileName);
    fs.unlinkSync(req.file.path);
    res.json({ success: true, fileName });
  } catch (e) {
    console.error('Ошибка отправки в Telegram:', e);
    fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, error: 'Ошибка отправки в Telegram' });
  }
});

module.exports = router;