export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('pvz_history')) || [];
  } catch {
    return [];
  }
}

export function addToHistory(item) {
  const history = getHistory();
  const newHistory = [item, ...history].slice(0, 5);
  localStorage.setItem('pvz_history', JSON.stringify(newHistory));
  return newHistory;
} 