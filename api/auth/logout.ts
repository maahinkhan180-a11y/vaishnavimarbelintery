import type { Request, Response } from 'express';
import { clearSessionCookie } from '../../server/auth';

export default function handler(request: Request, response: Response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  clearSessionCookie(response);
  return response.status(200).json({ authenticated: false });
}
