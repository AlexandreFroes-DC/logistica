'use client';
import React, { useState, useRef } from 'react';

export default function UploadForm({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = inputRef.current.files[0];
    if (!file) return setError('Selecione um arquivo .xls ou .xlsx');
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white shadow">
      <label htmlFor="file" className="block text-sm font-medium mb-2">Arquivo Excel (.xls/.xlsx)</label>
      <input ref={inputRef} id="file" type="file" accept=".xls,.xlsx" />
      <button
        type="submit"
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Processando...' : 'Enviar arquivo'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
