import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import type { ExecuteValues, RowDataPacket } from 'mysql2';
import { getPool } from '../../server/db';
import { requireAdmin } from '../../server/auth';

const fields = {
  categories: ['id', 'name', 'slug', 'description', 'image_url', 'display_order'],
  subcategories: ['id', 'category_id', 'name', 'slug', 'description', 'image_url', 'display_order'],
  products: [
    'id', 'subcategory_id', 'name', 'slug', 'description', 'image_url', 'brand', 'material',
    'size', 'thickness', 'finish', 'color', 'design', 'coverage_per_box', 'pieces_per_box',
    'suitable_for', 'price', 'mrp', 'stock_status', 'rating', 'specs', 'is_featured', 'display_order',
  ],
} as const;

type CatalogTable = keyof typeof fields;

function queryValue(value: unknown) {
  if (typeof value === 'string') return value;
  return Array.isArray(value) && typeof value[0] === 'string' ? value[0] : undefined;
}

function normalizeRow(row: Record<string, unknown>) {
  for (const key of ['price', 'mrp', 'rating', 'display_order']) {
    if (row[key] !== null && row[key] !== undefined) row[key] = Number(row[key]);
  }
  if (row.is_featured !== undefined) row.is_featured = Boolean(row.is_featured);
  if (typeof row.specs === 'string') row.specs = JSON.parse(row.specs);
  return row;
}

function isDatabaseValue(value: unknown): value is ExecuteValues {
  return value === null || typeof value === 'string' || typeof value === 'number'
    || typeof value === 'boolean' || typeof value === 'bigint' || value instanceof Date;
}

export default async function handler(request: Request, response: Response) {
  const table = queryValue(request.params.table) || queryValue(request.query.table);
  if (!table || !Object.prototype.hasOwnProperty.call(fields, table)) {
    return response.status(404).json({ error: 'Unknown catalog resource' });
  }
  const catalogTable = table as CatalogTable;
  const allowedFields: readonly string[] = fields[catalogTable];

  try {
    if (request.method === 'GET') {
      const conditions: string[] = [];
      const values: ExecuteValues[] = [];
      const filters: Array<[string, string]> = [
        ['id', 'id'],
        ['excludeId', 'id'],
        ['slug', 'slug'],
        ['categoryId', 'category_id'],
        ['subcategoryId', 'subcategory_id'],
      ];
      for (const [queryKey, column] of filters) {
        const value = queryValue(request.query[queryKey]);
        if (value && allowedFields.includes(column)) {
          conditions.push(`\`${column}\` ${queryKey === 'excludeId' ? '<>' : '='} ?`);
          values.push(value);
        }
      }

      const subcategoryIds = queryValue(request.query.subcategoryIds);
      if (subcategoryIds && catalogTable === 'products') {
        const ids = subcategoryIds.split(',').filter(Boolean).slice(0, 500);
        if (ids.length) {
          conditions.push(`subcategory_id IN (${ids.map(() => '?').join(', ')})`);
          values.push(...ids);
        }
      }

      const featured = queryValue(request.query.featured);
      if (featured && catalogTable === 'products') {
        conditions.push('is_featured = ?');
        values.push(featured === 'true' ? 1 : 0);
      }

      const search = queryValue(request.query.search);
      if (search && catalogTable === 'products') {
        conditions.push('(name LIKE ? OR description LIKE ? OR brand LIKE ? OR material LIKE ?)');
        values.push(...Array(4).fill(`%${search}%`));
      }

      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const orderBy = queryValue(request.query.orderBy) || 'display_order';
      const direction = queryValue(request.query.direction) === 'desc' ? 'DESC' : 'ASC';
      const safeOrderBy = allowedFields.includes(orderBy) ? orderBy : 'display_order';
      const requestedLimit = Number(queryValue(request.query.limit));
      const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 5000) : 5000;
      const [rows] = await getPool().execute<RowDataPacket[]>(
        `SELECT * FROM \`${catalogTable}\` ${where} ORDER BY \`${safeOrderBy}\` ${direction} LIMIT ${limit}`,
        values,
      );
      return response.status(200).json(rows.map(row => normalizeRow(row)));
    }

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      const adminEmail = requireAdmin(request, response);
      if (!adminEmail) return;

      if (request.method === 'DELETE') {
        const id = request.body?.id;
        if (typeof id !== 'string' || !id) return response.status(400).json({ error: 'A record id is required' });
        await getPool().execute(`DELETE FROM \`${catalogTable}\` WHERE id = ?`, [id]);
        return response.status(200).json({ success: true });
      }

      const body = request.body as Record<string, unknown> | undefined;
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return response.status(400).json({ error: 'A JSON object is required' });
      }
      const data: Record<string, ExecuteValues> = {};
      for (const [key, value] of Object.entries(body)) {
        if (key === 'id' || !allowedFields.includes(key)) continue;
        if (catalogTable === 'products' && key === 'specs' && value && typeof value === 'object') {
          data[key] = JSON.stringify(value);
        } else if (isDatabaseValue(value)) {
          data[key] = value;
        }
      }

      if (request.method === 'POST') {
        if (catalogTable === 'products' && data.specs === undefined) data.specs = JSON.stringify({});
        if (!Object.keys(data).length) return response.status(400).json({ error: 'No valid fields provided' });
        const id = randomUUID();
        const columns = ['id', ...Object.keys(data)];
        const values = [id, ...Object.values(data)];
        await getPool().execute(
          `INSERT INTO \`${catalogTable}\` (${columns.map(column => `\`${column}\``).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
          values,
        );
        return response.status(201).json({ id });
      }

      const id = body.id;
      if (typeof id !== 'string' || !id || !Object.keys(data).length) {
        return response.status(400).json({ error: 'A record id and update fields are required' });
      }
      const assignments = Object.keys(data).map(column => `\`${column}\` = ?`).join(', ');
      await getPool().execute(
        `UPDATE \`${catalogTable}\` SET ${assignments} WHERE id = ?`,
        [...Object.values(data), id],
      );
      return response.status(200).json({ success: true });
    }

    response.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(`Catalog API failure (${catalogTable}):`, error);
    return response.status(500).json({ error: 'Database request failed' });
  }
}
