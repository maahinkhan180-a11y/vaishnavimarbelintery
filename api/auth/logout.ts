import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearSessionCookie } from '../../server/auth';

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  clearSessionCookie(response);
  return response.status(200).json({ authenticated: false });
}
