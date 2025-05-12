import React, { useState } from "react";

export default function SummaryForm({ onSend, loading }) {
  const [toReceive, setToReceive] = useState("");
  const [received, setReceived] = useState("");
  const [cash, setCash] = useState("");
  const [encashment, setEncashment] = useState("");
  const [error, setError] = useState("");

  const remainder = (parseInt(cash) || 0) - (parseInt(encashment) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toReceive || !received || !cash) {
      setError("Заполните все поля");
      return;
    }
    setError("");
    onSend({
      toReceive,
      received,
      cash,
      encashment,
      remainder,
    });
    setToReceive("");
    setReceived("");
    setCash("");
    setEncashment("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded mt-4">
      <h3 className="mb-2">Итог смены</h3>
      <input
        type="number"
        placeholder="К приёмке"
        value={toReceive}
        onChange={(e) => setToReceive(e.target.value)}
        className="mb-2 w-full p-2 rounded"
      />
      <input
        type="number"
        placeholder="Принято"
        value={received}
        onChange={(e) => setReceived(e.target.value)}
        className="mb-2 w-full p-2 rounded"
      />
      <input
        type="number"
        placeholder="Касса (₽)"
        value={cash}
        onChange={(e) => setCash(e.target.value)}
        className="mb-2 w-full p-2 rounded"
      />
      <input
        type="number"
        placeholder="Инкассация (₽)"
        value={encashment}
        onChange={(e) => setEncashment(e.target.value)}
        className="mb-2 w-full p-2 rounded"
      />
      <div className="mb-2">Остаток: <b>{remainder} ₽</b></div>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Отправка..." : "Отправить итог смены"}
      </button>
    </form>
  );
} 