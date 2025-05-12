import React from "react";

export default function Toast({ message, type }) {
  if (!message) return null;
  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
      {message}
    </div>
  );
} 