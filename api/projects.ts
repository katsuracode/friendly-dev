import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = (_req: VercelRequest, res: VercelResponse) => {
  try {
    const filePath = join(process.cwd(), 'data', 'db.json');

    const json = JSON.parse(readFileSync(filePath, 'utf-8'));
    console.log(json);

    res.status(200).json(json.projects);
  } catch (_err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}

export default handler;