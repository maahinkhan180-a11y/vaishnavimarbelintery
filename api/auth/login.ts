import { timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { createSession, setSessionCookie } from '../../server/auth';

function matches(value: string, expected: string) {
  const input = Buffer.from(value);
  const configured = Buffer.from(expected);
  return input.length === configured.length && timingSafeEqual(input, configured);
}

export default function handler(request: Request, response: Response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    return response.status(503).json({ error: 'Admin credentials or session secret are not configured' });
  }

  const { email, password } = request.body ?? {};
  if (typeof email !== 'string' || typeof password !== 'string'
    || !matches(email.trim().toLowerCase(), ADMIN_EMAIL.trim().toLowerCase())
    || !matches(password, ADMIN_PASSWORD)) {
    return response.status(401).json({ error: 'Invalid email or password' });
  }

  setSessionCookie(response, createSession(ADMIN_EMAIL));
  return response.status(200).json({ authenticated: true, email: ADMIN_EMAIL });
}
