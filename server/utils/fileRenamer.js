function generateFileName(docType, date = new Date()) {
  const pad = (n) => n.toString().padStart(2, '0');
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  return `${docType}_${d}.${m}.${y}.jpg`;
}

module.exports = { generateFileName }; 