import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionEmail } from '../../server/auth';

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' });
  const email = getSessionEmail(request);
  return response.status(200).json({ authenticated: Boolean(email), email });
}
