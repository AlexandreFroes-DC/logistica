import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

// Lê o arquivo XLS/XLSX enviado
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

  // Processa dados logísticos
  const totalProdutos = rows.length;
  const estoqueTotal = rows.reduce((acc, r) => acc + (Number(r.estoque) || 0), 0);
  const rupturas = rows.filter(r => Number(r.estoque) <= 0);

  const resumo = {
    totalProdutos,
    estoqueTotal,
    rupturas: rupturas.length,
  };

  return NextResponse.json({
    resumo,
    rupturas: rupturas.slice(0, 5), // primeiros 5 produtos com ruptura
  });
}
