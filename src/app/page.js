'use client';
import { useState } from 'react';
import UploadForm from './components/UploadForm';

export default function Home() {
  const [report, setReport] = useState(null);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Análise Logística - Upload de Planilha</h1>
      <UploadForm onResult={setReport} />

      {report && (
        <section className="mt-6 bg-white p-4 rounded-lg shadow w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">Resultado da Análise</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(report, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
