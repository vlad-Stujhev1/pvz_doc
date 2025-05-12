import React, { useState } from "react";

const DOC_TYPES = [
  { value: "ПЯ", label: "Приемка ЯМ" },
  { value: "ВЯ", label: "Возврат ЯМ" },
  { value: "ПД", label: "ПД" },
  { value: "ВД", label: "ВД" },
  { value: "ВК", label: "ВК" },
  { value: "GO", label: "GO" },
  { value: "Инвет", label: "Инвентаризация" },
  { value: "Авито", label: "Авито" },
];

export default function UploadForm({ onUpload, loading }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [signature, setSignature] = useState("");
  const [docType, setDocType] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return setError("📷 Добавьте фото");
    if (!signature.trim()) return setError("Введите подпись");
    if (!docType) return setError("Выберите тип документа");
    setError("");
    onUpload({ file, signature, docType });
    setFile(null);
    setPreview(null);
    setSignature("");
    setDocType("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded">
      <label className="block mb-2">Сделать фото</label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="mb-2"
      />
      {preview && <img src={preview} alt="preview" className="mb-2 w-32" />}
      <input
        type="text"
        placeholder="Подпись"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        className="mb-2 w-full p-2 rounded"
        required
      />
      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        className="mb-2 w-full p-2 rounded"
        required
      >
        <option value="">Тип документа</option>
        {DOC_TYPES.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!file || !signature || !docType || loading}
      >
        {loading ? "Отправка..." : "📤 Отправить"}
      </button>
    </form>
  );
} 