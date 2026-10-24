import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool } from '../server/db';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' });
  try {
    await getPool().execute('SELECT 1');
    return response.status(200).json({ databaseConnected: true });
  } catch (error) {
    console.error('MySQL health check failed:', error);
    return response.status(503).json({ databaseConnected: false });
  }
}
