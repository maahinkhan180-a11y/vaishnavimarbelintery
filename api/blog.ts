import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ExecuteValues, RowDataPacket } from 'mysql2';
import { getPool } from '../server/db';
import { getSessionEmail, requireAdmin } from '../server/auth';

const articleFields = [
  'title', 'slug', 'content', 'excerpt', 'featured_image_url', 'category', 'author',
  'published_at', 'updated_at', 'tags', 'is_published',
];

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function isDatabaseValue(input: unknown): input is ExecuteValues {
  return input === null || typeof input === 'string' || typeof input === 'number'
    || typeof input === 'boolean' || typeof input === 'bigint' || input instanceof Date;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    if (request.method === 'GET') {
      const conditions: string[] = [];
      const values: ExecuteValues[] = [];
      const admin = Boolean(getSessionEmail(request));
      if (!admin) conditions.push('is_published = 1');
      for (const [key, column] of [['slug', 'slug'], ['category', 'category']] as const) {
        const filter = value(request.query[key]);
        if (filter) {
          conditions.push(`\`${column}\` = ?`);
          values.push(filter);
        }
      }
      const excludeId = value(request.query.excludeId);
      if (excludeId) {
        conditions.push('id <> ?');
        values.push(excludeId);
      }
      const order = value(request.query.order) === 'asc' ? 'ASC' : 'DESC';
      const requestedLimit = Number(value(request.query.limit));
      const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 500) : 500;
      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const [rows] = await getPool().execute<RowDataPacket[]>(
        `SELECT * FROM blog_articles ${where} ORDER BY published_at ${order} LIMIT ${limit}`,
        values,
      );
      return response.status(200).json(rows.map(row => ({
        ...row,
        tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
        is_published: Boolean(row.is_published),
      })));
    }

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      if (!requireAdmin(request, response)) return;
      const body = request.body as Record<string, unknown> | undefined;
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return response.status(400).json({ error: 'A JSON object is required' });
      }

      if (request.method === 'DELETE') {
        if (typeof body.id !== 'string' || !body.id) return response.status(400).json({ error: 'A record id is required' });
        await getPool().execute('DELETE FROM blog_articles WHERE id = ?', [body.id]);
        return response.status(200).json({ success: true });
      }

      const data: Record<string, ExecuteValues> = {};
      for (const [key, item] of Object.entries(body)) {
        if (key === 'id' || !articleFields.includes(key)) continue;
        if (key === 'tags' && Array.isArray(item)) data[key] = JSON.stringify(item);
        else if (key === 'is_published' && typeof item === 'boolean') data[key] = item ? 1 : 0;
        else if (isDatabaseValue(item)) data[key] = item;
      }
      data.updated_at = new Date();

      if (request.method === 'POST') {
        const id = randomUUID();
        const columns = ['id', ...Object.keys(data)];
        await getPool().execute(
          `INSERT INTO blog_articles (${columns.map(column => `\`${column}\``).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
          [id, ...Object.values(data)],
        );
        return response.status(201).json({ id });
      }

      if (typeof body.id !== 'string' || !body.id) return response.status(400).json({ error: 'A record id is required' });
      const assignments = Object.keys(data).map(column => `\`${column}\` = ?`).join(', ');
      await getPool().execute(
        `UPDATE blog_articles SET ${assignments} WHERE id = ?`,
        [...Object.values(data), body.id],
      );
      return response.status(200).json({ success: true });
    }

    response.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Blog API failure:', error);
    return response.status(500).json({ error: 'Database request failed' });
  }
}
