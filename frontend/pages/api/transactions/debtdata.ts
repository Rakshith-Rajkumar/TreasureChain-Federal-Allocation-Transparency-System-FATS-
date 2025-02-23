import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataFilePath = path.join(process.cwd(), 'pages/api/transactions/120DayDelDebtRefComp_20191001_20240930.json');
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error + ' Failed to load debt data' });
  }
}