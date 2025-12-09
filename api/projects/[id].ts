import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;

  const filePath = join(process.cwd(), 'data', 'db.json');
  const json = JSON.parse(readFileSync(filePath, 'utf-8'));

  const project = json.projects.find((p: any) => String(p.id) === String(id));

  if (!project) return res.status(404).json({ error: 'not found' });

  res.status(200).json(project);
}

export default handler;
