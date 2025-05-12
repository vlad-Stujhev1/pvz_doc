import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import SummaryForm from "./components/SummaryForm";
import HistoryList from "./components/HistoryList";
import Toast from "./components/Toast";
import { getHistory, addToHistory } from "./utils/storage";

export default function App() {
  const [history, setHistory] = useState(getHistory());
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type }), 2500);
  };

  const handleUpload = async ({ file, signature, docType }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("docType", docType);
    try {
      const res = await fetch("/upload/app", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const item = {
          fileName: data.fileName || file.name,
          signature,
          docType,
          date: new Date().toLocaleDateString(),
        };
        setHistory(addToHistory(item));
        showToast("Файл успешно отправлен");
      } else {
        showToast(data.error || "Ошибка отправки", "error");
      }
    } catch (e) {
      showToast("Ошибка соединения с сервером", "error");
    }
    setLoading(false);
  };

  const handleSummary = async (summary) => {
    setLoading(true);
    try {
      const res = await fetch("/send/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Отчёт успешно отправлен");
      } else {
        showToast(data.error || "Ошибка отправки отчёта", "error");
      }
    } catch (e) {
      showToast("Ошибка соединения с сервером", "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-4">Архив документов ПВЗ</h1>
      <UploadForm onUpload={handleUpload} loading={loading} />
      <SummaryForm onSend={handleSummary} loading={loading} />
      <HistoryList history={history} />
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
} 