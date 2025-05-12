import React from "react";

export default function HistoryList({ history }) {
  return (
    <div className="p-4 bg-gray-700 rounded mt-4">
      <h3 className="mb-2">История</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx} className="mb-1">
            <b>{item.fileName}</b> — {item.signature} ({item.docType})
          </li>
        ))}
      </ul>
    </div>
  );
} 